class Product < ApplicationRecord
  has_many :recipe_items, dependent: :destroy
  has_many :ingredients, through: :recipe_items
end
