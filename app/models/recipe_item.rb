class RecipeItem < ApplicationRecord
  belongs_to :product
  belongs_to :ingredient

  # Punto 7: Asegura que la cantidad siempre sea mayor a cero
  validates :quantity, numericality: { greater_than: 0 }
end
