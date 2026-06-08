class Ingredient < ApplicationRecord
  UNIT_MEASURES = ["kg", "g", "l", "ml", "unidad"].freeze

  has_many :recipe_items, dependent: :restrict_with_error
  has_many :products, through: :recipe_items

  validates :name, presence: true
  validates :unit_measure, presence: true, inclusion: { in: UNIT_MEASURES }
  validates :cost_per_unit, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
