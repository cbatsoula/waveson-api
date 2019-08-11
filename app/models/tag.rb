class Tag < ApplicationRecord
  belongs_to :user
  belongs_to :beach
  has_and_belongs_to_many :notes
end
