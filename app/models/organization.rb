class Organization < ApplicationRecord
   validates :name, presence: true
   has_many :meetings
end
