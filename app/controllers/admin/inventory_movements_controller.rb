class Admin::InventoryMovementsController < Admin::ApplicationController
  def index
    @products = Product
      .includes(
        { image_attachment: :blob },
        { recipe_items: :ingredient },
        { product_supplies: :supply }
      )
      .order(:name)
  end

  def new
    @products = Product
      .includes({ image_attachment: :blob })
      .order(:name)

    @selected_product_id = params[:product_id]
    @selected_movement_type = normalized_movement_type(params[:movement_type])
  end

  private

  def normalized_movement_type(value)
    allowed_types = [ "entry", "exit", "adjustment" ]
    allowed_types.include?(value) ? value : "entry"
  end
end
