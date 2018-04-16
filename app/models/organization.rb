class Organization < ApplicationRecord
  has_many :meetings, dependent: :destroy
  has_many :tops
end
