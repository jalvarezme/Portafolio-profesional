export const SIGNIN = "signin"
export const SIGNUP = "signup"

export const BASE_URL = "http://localhost:8000/api/v1"

export const AUTH_ENDPOINTS = {
  [SIGNUP]: `${BASE_URL}/auth/signup`,
  [SIGNIN]: `${BASE_URL}/auth/signin`,
}