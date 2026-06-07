class Product < ApplicationRecord
  has_many :recipe_items, dependent: :destroy
  has_many :ingredients, through: :recipe_items

  # Permite que un formulario de producto envíe también los datos de la receta
  accepts_nested_attributes_for :recipe_items, allow_destroy: true, reject_if: :all_blank

  # Punto 6: El cálculo sugerido
  def suggested_price
    # Si no hay costo o margen, devuelve 0 para no romper la vista
    return 0 unless cost && margin 
    cost * (1 + margin / 100.0)
  end
end
