class Admin::InventoryMovementsController < Admin::ApplicationController
  def index
    @products = Product
      .includes(
        { image_attachment: :blob },
        { recipe_items: :ingredient },
        { product_supplies: :supply }
      )
      .order(:name)

    @low_stock_threshold = 5
  end

  def new
  end
end
