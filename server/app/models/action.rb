class Action < ApplicationRecord
  belongs_to :top
  belongs_to :meeting
  belongs_to :protocol, optional: true
end
