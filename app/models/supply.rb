class Supply < ApplicationRecord
  CATEGORIES = {
    "jar" => "Frasco",
    "lid" => "Tapa",
    "label" => "Etiqueta"
  }.freeze

  UNIT_MEASURES = ["unidad", "pack"].freeze

  has_many :product_supplies, dependent: :restrict_with_error
  has_many :products, through: :product_supplies

  validates :name, presence: true, uniqueness: { scope: :category }
  validates :category, presence: true, inclusion: { in: CATEGORIES.keys }
  validates :unit_measure, presence: true, inclusion: { in: UNIT_MEASURES }
  validates :cost_per_unit, presence: true, numericality: { greater_than_or_equal_to: 0 }

  scope :jars, -> { where(category: "jar").order(:name) }
  scope :lids, -> { where(category: "lid").order(:name) }
  scope :labels, -> { where(category: "label").order(:name) }
  scope :ordered, -> { order(:category, :name) }

  def category_name
    CATEGORIES.fetch(category, category)
  end

  def display_name
    [name, size_description.presence].compact.join(" - ")
  end
end
