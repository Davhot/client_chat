# frozen_string_literal: true

# Базовый класс
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
