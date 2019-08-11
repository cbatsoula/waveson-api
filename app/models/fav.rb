class Fav < ApplicationRecord
  belongs_to :user
  belongs_to :beach
end
