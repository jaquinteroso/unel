class RecipeItem < ApplicationRecord
  belongs_to :product
  belongs_to :ingredient
end
