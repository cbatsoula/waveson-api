class User < ApplicationRecord
  has_many :notes
  has_many :tags
  has_many :beaches, :through => :favs
end
