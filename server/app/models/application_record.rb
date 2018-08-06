class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  default_scope { order(updated_at: :desc) }
  def self.creatable_fields(context)
    super + [:id]
  end
end
