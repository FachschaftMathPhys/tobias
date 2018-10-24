class Inmail < ApplicationRecord
  has_many :emails, as: :referencable
end
