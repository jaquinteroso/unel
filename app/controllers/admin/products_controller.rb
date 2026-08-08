class Admin::ProductsController < Admin::ApplicationController
  DEFAULT_LOW_STOCK_THRESHOLD = 5

  before_action :set_product, only: [ :show, :edit, :update, :destroy ]
  before_action :set_ingredients, only: [ :new, :edit, :create, :update ]
  before_action :set_supplies, only: [ :new, :edit, :create, :update ]

  def index
    @products = Product.includes(recipe_items: :ingredient, product_supplies: :supply)
    average_cost = @products.any? ? @products.sum(&:calculated_cost) / @products.count : 0

    @product_stats = {
      total_products: @products.count,
      average_cost: average_cost,
      without_final_price: @products.where(price: [ nil, 0 ]).count,
      low_stock: @products.count { |product| product.stock.to_i <= low_stock_threshold_for(product) }
    }
  end

  def show
  end

  def new
    @product = Product.new
    build_missing_product_supplies
  end

  def edit
    build_missing_product_supplies
  end

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

  def update
    if @product.update(product_params)
      redirect_to admin_products_path, notice: "Producto actualizado con éxito."
    else
      build_missing_product_supplies
      flash.now[:alert] = "No se pudo actualizar el producto. Revisa los errores marcados abajo."
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
    redirect_to admin_products_path, notice: "Producto eliminado con éxito.", status: :see_other
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

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
    [ "jar", "lid" ].each do |role|
      next if @product.product_supplies.any? { |product_supply| product_supply.role == role }

      @product.product_supplies.build(role: role, quantity: 1)
    end

    blank_label_exists = @product.product_supplies.any? do |product_supply|
      product_supply.role == "label" && product_supply.new_record? && product_supply.supply_id.blank?
    end

    @product.product_supplies.build(role: "label", quantity: 1) unless blank_label_exists
  end

  def low_stock_threshold_for(product)
    if product.respond_to?(:low_stock_threshold) && product.low_stock_threshold.present?
      product.low_stock_threshold.to_i
    else
      DEFAULT_LOW_STOCK_THRESHOLD
    end
  end

  def product_params
    base_params = [
      :name,
      :description,
      :cost,
      :margin,
      :price,
      :stock,
      :image
    ]

    base_params << :low_stock_threshold if Product.new.respond_to?(:low_stock_threshold)

    params.require(:product).permit(
      *base_params,
      recipe_items_attributes: [ :id, :ingredient_id, :quantity, :quantity_unit, :_destroy ],
      product_supplies_attributes: [ :id, :supply_id, :role, :quantity, :_destroy ]
    )
  end
end
