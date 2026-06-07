class Admin::ProductsController < Admin::ApplicationController
  before_action :set_product, only: [:edit, :update]
  before_action :set_ingredients, only: [:new, :edit, :create, :update]

  # Punto 1: Estadísticas y Lista
  def index
    @products = Product.all
    
    # Preparamos las cartas de estadísticas para Pedro
    @product_stats = {
      total_products: @products.count,
      average_cost: @products.average(:cost).to_i || 0,
      without_final_price: @products.where(price: [nil, 0]).count,
      low_stock: @products.where("stock < ?", 10).count # Asumimos que menos de 10 es bajo stock
    }
  end

  # Punto 2: Formulario Nuevo
  def new
    @product = Product.new
    # @ingredients se carga automático gracias al before_action de arriba
  end

  # Punto 3: Formulario Editar
  def edit
    # @product y @ingredients se cargan automático por los before_action
  end

  # Punto 4: Guardar en Base de Datos
  def create
    @product = Product.new(product_params)

    if @product.save
      redirect_to admin_products_path, notice: "Producto creado con éxito."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # Punto 4: Actualizar en Base de Datos
  def update
    if @product.update(product_params)
      redirect_to admin_products_path, notice: "Producto actualizado con éxito."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  # Método auxiliar para no repetir código
  def set_product
    @product = Product.find(params[:id])
  end

  # Método auxiliar para cargar los ingredientes en los formularios
  def set_ingredients
    @ingredients = Ingredient.all
  end

  # Punto 5: Los parámetros permitidos de seguridad (Strong Params)
  def product_params
    params.require(:product).permit(
      :name, 
      :description, 
      :cost, 
      :margin, 
      :price, 
      :stock,
      recipe_items_attributes: [:id, :ingredient_id, :quantity, :_destroy]
    )
  end
end
