# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'POST /login_api', type: :request do
  let(:user) { create(:user) }
  let(:url) { '/login_api' }
  let(:params) do
    {
      user: {
        email: user.email,
        password: user.password
      }
    }
  end

  context 'when params are correct' do
    before do
      post url, params: params
    end

    it 'returns 200' do
      expect(response).to have_http_status(200)
    end

    it 'returns JTW token in authorization header' do
      expect(response.headers['Authorization']).to be_present
    end

    it 'returns valid JWT token' do
      token_from_request = response.headers['Authorization'].split(' ').last
      decoded_token = JWT.decode(token_from_request, ENV['DEVISE_JWT_SECRET_KEY'], true)
      expect(decoded_token.first['sub']).to be_present
    end
  end

  context 'when login params are incorrect' do
    before { post url }

    it 'returns unathorized status' do
      expect(response.headers['Authorization']).to be_blank
    end
  end
end

RSpec.describe 'DELETE /logout_api', type: :request do
  let(:url) { '/logout_api' }

  it 'returns 204, no content' do
    delete url
    expect(response).to have_http_status(204)
  end
end
