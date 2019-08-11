class Beach < ApplicationRecord
  has_many :notes
  has_many :tags
  has_many :users, :through => :favs

end
