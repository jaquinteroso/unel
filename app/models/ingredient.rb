class Ingredient < ApplicationRecord
  has_many :recipe_items, dependent: :destroy
  has_many :products, through: :recipe_items
end
