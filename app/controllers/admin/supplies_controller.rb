class Admin::SuppliesController < Admin::ApplicationController
  before_action :set_supply, only: [:edit, :update, :destroy]

  def index
    @supplies = Supply.includes(:products).ordered
  end

  def new
    @supply = Supply.new(unit_measure: "unidad")
  end

  def create
    @supply = Supply.new(supply_params)

    if @supply.save
      redirect_to admin_supplies_path, notice: "Insumo creado con éxito."
    else
      flash.now[:alert] = "No se pudo crear el insumo. Revisa los errores marcados abajo."
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @supply.update(supply_params)
      redirect_to admin_supplies_path, notice: "Insumo actualizado con éxito."
    else
      flash.now[:alert] = "No se pudo actualizar el insumo. Revisa los errores marcados abajo."
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    if @supply.destroy
      redirect_to admin_supplies_path, notice: "Insumo eliminado con éxito.", status: :see_other
    else
      redirect_to admin_supplies_path,
        alert: "No se puede eliminar este insumo porque está siendo usado por uno o más productos.",
        status: :see_other
    end
  end

  private

  def set_supply
    @supply = Supply.find(params[:id])
  end

  def supply_params
    params.require(:supply).permit(
      :name,
      :category,
      :size_description,
      :size_value,
      :size_unit,
      :label_type,
      :unit_measure,
      :pack_quantity,
      :cost_per_unit
    )
  end
end
