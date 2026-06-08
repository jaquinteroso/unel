class Product < ApplicationRecord
  has_one_attached :image
  has_rich_text :description

  has_many :recipe_items, dependent: :destroy
  has_many :ingredients, through: :recipe_items
  has_many :product_supplies, dependent: :destroy
  has_many :supplies, through: :product_supplies

  accepts_nested_attributes_for :recipe_items, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :product_supplies, allow_destroy: true, reject_if: :all_blank

  # 1. Hace que el nombre sea un campo obligatorio sí o sí
  validates :name, presence: { message: "El nombre no puede estar en blanco" }

  # 2. Revisa la descripción antes de guardar
  before_save :set_default_description

  def calculated_cost
    ingredient_cost = recipe_items.includes(:ingredient).sum do |recipe_item|
      recipe_item.quantity.to_d * recipe_item.ingredient.cost_per_unit.to_d
    end

    supply_cost = product_supplies.includes(:supply).sum do |product_supply|
      product_supply.quantity.to_d * product_supply.supply.cost_per_unit.to_d
    end

    ingredient_cost + supply_cost
  end

  def stock_cost
    calculated_cost * stock.to_i
  end

  def suggested_price
    return 0 unless margin

    calculated_cost * (1 + margin.to_d / 100)
  end

  private

  # Método que pone "Sin descripción" si el usuario lo dejó en blanco
  def set_default_description
    if description.blank? || description.to_plain_text.strip.empty?
      self.description = "Sin descripción"
    end
  end
end
