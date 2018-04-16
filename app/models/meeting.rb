class Meeting < ApplicationRecord
  belongs_to :organization
  has_many :actions
  has_many :tops, :through=> :actions
end
