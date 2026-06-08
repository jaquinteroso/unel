class Admin::IngredientsController < Admin::ApplicationController
  before_action :set_ingredient, only: [:edit, :update, :destroy]

  def index
    @ingredients = Ingredient.order(:name)
  end

  def new
    @ingredient = Ingredient.new
  end

  def create
    @ingredient = Ingredient.new(ingredient_params)

    if @ingredient.save
      redirect_to admin_ingredients_path, notice: "Ingrediente creado con éxito."
    else
      flash.now[:alert] = "No se pudo crear el ingrediente. Revisa los errores marcados abajo."
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @ingredient.update(ingredient_params)
      redirect_to admin_ingredients_path, notice: "Ingrediente actualizado con éxito."
    else
      flash.now[:alert] = "No se pudo actualizar el ingrediente. Revisa los errores marcados abajo."
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    if @ingredient.destroy
      redirect_to admin_ingredients_path, notice: "Ingrediente eliminado con éxito.", status: :see_other
    else
      redirect_to admin_ingredients_path, alert: @ingredient.errors.full_messages.to_sentence, status: :see_other
    end
  end

  private

  def set_ingredient
    @ingredient = Ingredient.find(params[:id])
  end

  def ingredient_params
    params.require(:ingredient).permit(:name, :unit_measure, :cost_per_unit)
  end
end
