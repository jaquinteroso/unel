class ProductSupply < ApplicationRecord
  ROLES = {
    "jar" => "Frasco",
    "lid" => "Tapa",
    "label" => "Etiqueta"
  }.freeze

  belongs_to :product
  belongs_to :supply

  validates :role, presence: true, inclusion: { in: ROLES.keys }
  validates :supply_id, uniqueness: { scope: :product_id }
  validates :quantity, presence: true, numericality: { greater_than: 0 }
  validate :supply_category_matches_role
  validate :single_primary_supply_per_product

  def role_name
    ROLES.fetch(role, role)
  end

  def calculated_cost
    return 0.to_d if supply.blank? || quantity.blank?

    quantity.to_d * supply.effective_unit_cost
  end

  private

  def supply_category_matches_role
    return if supply.blank? || role.blank?
    return if supply.category == role

    errors.add(:supply, "debe corresponder al tipo #{role_name}")
  end

  def single_primary_supply_per_product
    return unless ["jar", "lid"].include?(role)
    return if product.blank?

    in_memory_duplicate = product.product_supplies.target.any? do |product_supply|
      product_supply != self &&
        !product_supply.marked_for_destruction? &&
        product_supply.role == role
    end
    persisted_duplicate = product.product_supplies.where(role: role).where.not(id: id).exists?

    errors.add(:role, "ya está asignado al producto") if in_memory_duplicate || persisted_duplicate
  end
end
