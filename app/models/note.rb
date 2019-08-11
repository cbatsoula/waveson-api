class Note < ApplicationRecord
  belongs_to :user
  belongs_to :beach
  has_and_belongs_to_many :tags
end
