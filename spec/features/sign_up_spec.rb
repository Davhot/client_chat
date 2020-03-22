# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'POST /signup_api', type: :request do
  include ApiHelper

  let(:url) { '/signup_api' }
  let(:params) do
    {
      user: {
        email: 'user@example.com',
        password: 'password'
      }
    }
  end

  context 'when user is unauthenticated' do
    before(:each) do
      post url, params: params
    end

    it 'returns 200' do
      expect(response.status).to eq 200
    end

    it 'returns a new user' do
      expect(body['email']).to eq(params[:user][:email])
    end
  end

  context 'when user already exists' do
    before(:each) do
      create :user, email: params[:user][:email]
      post url, params: params
    end

    it 'returns bad request status' do
      expect(response.status).to eq 400
    end

    it 'returns validation errors' do
      expect(body['errors'].first['title']).to eq('Bad Request')
    end
  end
end
