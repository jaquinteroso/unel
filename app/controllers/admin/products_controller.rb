class Admin::ProductsController < Admin::ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  before_action :set_ingredients, only: [:new, :edit, :create, :update]
  before_action :set_supplies, only: [:new, :edit, :create, :update]

  # Punto 1: Estadísticas y Lista
  def index
    @products = Product.includes(recipe_items: :ingredient, product_supplies: :supply)
    average_cost = @products.any? ? @products.sum(&:calculated_cost) / @products.count : 0

    # Preparamos las cartas de estadísticas para Pedro
    @product_stats = {
      total_products: @products.count,
      average_cost: average_cost,
      without_final_price: @products.where(price: [nil, 0]).count,
      low_stock: @products.where("stock < ?", 10).count # Asumimos que menos de 10 es bajo stock
    }
  end

  # Punto 1.5: Ver Detalle
  def show
    # @product se carga automáticamente gracias al before_action de arriba
  end

  # Punto 2: Formulario Nuevo
  def new
    @product = Product.new
    build_missing_product_supplies
    # @ingredients se carga automático gracias al before_action de arriba
  end

  # Punto 3: Formulario Editar
  def edit
    build_missing_product_supplies
    # @product y @ingredients se cargan automático por los before_action
  end

  # Punto 4: Guardar en Base de Datos
  def create
    @product = Product.new(product_params)

    if @product.save
      redirect_to admin_products_path, notice: "Producto creado con éxito."
    else
      build_missing_product_supplies
      flash.now[:alert] = "No se pudo crear el producto. Revisa los errores marcados abajo."
      render :new, status: :unprocessable_entity
    end
  end

  # Punto 4: Actualizar en Base de Datos
  def update
    if @product.update(product_params)
      redirect_to admin_products_path, notice: "Producto actualizado con éxito."
    else
      build_missing_product_supplies
      flash.now[:alert] = "No se pudo actualizar el producto. Revisa los errores marcados abajo."
      render :edit, status: :unprocessable_entity
    end
  end

  # Punto 6: Eliminar en Base de Datos
  def destroy
    @product.destroy
    redirect_to admin_products_path, notice: "Producto eliminado con éxito.", status: :see_other
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

  def set_supplies
    @supplies_by_category = {
      "jar" => Supply.jars,
      "lid" => Supply.lids,
      "label" => Supply.labels
    }
  end

  def build_missing_product_supplies
    ProductSupply::ROLES.each_key do |role|
      next if @product.product_supplies.any? { |product_supply| product_supply.role == role }

      @product.product_supplies.build(role: role, quantity: 1)
    end
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
      :image,
      recipe_items_attributes: [:id, :ingredient_id, :quantity, :_destroy],
      product_supplies_attributes: [:id, :supply_id, :role, :quantity, :_destroy]
    )
  end
end
