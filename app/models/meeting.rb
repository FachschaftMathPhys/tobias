class Meeting < ApplicationRecord
  belongs_to :organization
  has_many :tops,dependent: :destroy
end
