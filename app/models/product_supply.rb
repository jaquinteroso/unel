class ProductSupply < ApplicationRecord
  ROLES = {
    "jar" => "Frasco",
    "lid" => "Tapa",
    "label" => "Etiqueta"
  }.freeze

  belongs_to :product
  belongs_to :supply

  validates :role, presence: true, inclusion: { in: ROLES.keys }, uniqueness: { scope: :product_id }
  validates :quantity, presence: true, numericality: { greater_than: 0 }
  validate :supply_category_matches_role

  def role_name
    ROLES.fetch(role, role)
  end

  private

  def supply_category_matches_role
    return if supply.blank? || role.blank?
    return if supply.category == role

    errors.add(:supply, "debe corresponder al tipo #{role_name}")
  end
end
