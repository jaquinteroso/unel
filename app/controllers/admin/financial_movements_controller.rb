class Admin::FinancialMovementsController < Admin::ApplicationController
  def index
    @financial_movements = []
  end

  def new
    @movement_type = normalized_movement_type(params[:movement_type])
  end

  private

  def normalized_movement_type(value)
    allowed_types = [ "income", "expense" ]
    allowed_types.include?(value) ? value : "income"
  end
end
