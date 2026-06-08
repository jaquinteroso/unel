class RecipeItem < ApplicationRecord
  UNIT_CONVERSIONS = {
    "kg" => { "kg" => 1.to_d, "g" => 0.001.to_d },
    "g" => { "g" => 1.to_d },
    "l" => { "l" => 1.to_d, "ml" => 0.001.to_d },
    "ml" => { "ml" => 1.to_d },
    "unidad" => { "unidad" => 1.to_d }
  }.freeze

  belongs_to :product
  belongs_to :ingredient

  # Punto 7: Asegura que la cantidad siempre sea mayor a cero
  validates :quantity, numericality: { greater_than: 0 }
  validates :quantity_unit, presence: true
  validate :quantity_unit_is_compatible_with_ingredient

  before_validation :set_default_quantity_unit

  def converted_quantity
    return 0.to_d if quantity.blank? || ingredient.blank?

    quantity.to_d * conversion_factor
  end

  def calculated_cost
    converted_quantity * ingredient.cost_per_unit.to_d
  end

  def available_quantity_units
    self.class.available_units_for(ingredient&.unit_measure)
  end

  def self.available_units_for(unit_measure)
    UNIT_CONVERSIONS.fetch(unit_measure, {}).keys
  end

  private

  def set_default_quantity_unit
    self.quantity_unit = ingredient.unit_measure if quantity_unit.blank? && ingredient.present?
  end

  def conversion_factor
    UNIT_CONVERSIONS.fetch(ingredient.unit_measure, {}).fetch(quantity_unit, 0.to_d)
  end

  def quantity_unit_is_compatible_with_ingredient
    return if ingredient.blank? || quantity_unit.blank?
    return if available_quantity_units.include?(quantity_unit)

    errors.add(:quantity_unit, "no es compatible con la unidad del ingrediente")
  end
end
