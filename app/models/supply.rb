class Supply < ApplicationRecord
  CATEGORIES = {
    "jar" => "Frasco",
    "lid" => "Tapa",
    "label" => "Etiqueta"
  }.freeze

  UNIT_MEASURES = ["unidad", "pack"].freeze
  SIZE_UNITS = ["ml", "l", "g", "kg", "mm", "cm", "unidad"].freeze
  LABEL_TYPES = {
    "front" => "Frontal",
    "side" => "Lateral",
    "lid" => "Tapa",
    "qr" => "QR",
    "other" => "Otra"
  }.freeze

  has_many :product_supplies, dependent: :restrict_with_error
  has_many :products, through: :product_supplies

  validates :name, presence: true, uniqueness: { scope: :category }
  validates :category, presence: true, inclusion: { in: CATEGORIES.keys }
  validates :unit_measure, presence: true, inclusion: { in: UNIT_MEASURES }
  validates :cost_per_unit, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :size_value, presence: true, numericality: { only_integer: true, greater_than: 0 }, unless: :label?
  validates :size_unit, presence: true, inclusion: { in: SIZE_UNITS }, unless: :label?
  validates :label_type, presence: true, inclusion: { in: LABEL_TYPES.keys }, if: :label?
  validates :pack_quantity, numericality: { only_integer: true, greater_than: 0 }, allow_blank: true
  validate :pack_quantity_required_for_pack

  scope :jars, -> { where(category: "jar").order(:name) }
  scope :lids, -> { where(category: "lid").order(:name) }
  scope :labels, -> { where(category: "label").order(:name) }
  scope :ordered, -> { order(:category, :name) }

  def category_name
    CATEGORIES.fetch(category, category)
  end

  def display_name
    [name, descriptor].compact.join(" - ")
  end

  def descriptor
    label? ? label_type_name : size_label
  end

  def label?
    category == "label"
  end

  def label_type_name
    LABEL_TYPES[label_type]
  end

  def size_label
    return if size_value.blank? || size_unit.blank?

    "#{size_value} #{size_unit}"
  end

  def effective_unit_cost
    return cost_per_unit.to_d / pack_quantity.to_d if unit_measure == "pack" && pack_quantity.to_i.positive?

    cost_per_unit.to_d
  end

  private

  def pack_quantity_required_for_pack
    return unless unit_measure == "pack" && pack_quantity.blank?

    errors.add(:pack_quantity, "debe estar presente cuando la unidad es pack")
  end
end
