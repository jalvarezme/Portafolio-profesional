export const SIGNIN = "signin"
export const SIGNUP = "signup"

// export const HOST = "https://jalvarezme-appointment.deno.dev" // add env variable for this

export const HOST = "http://localhost:8000" // add env variable for this


// export const BASE_URL = "https://jalvarezme-appointment.deno.dev/api/v1" // add env variable for this

export const BASE_URL = "http://localhost:8000/api/v1" // add env variable for this


export const AUTH_ENDPOINTS = {
  [SIGNUP]: `${BASE_URL}/auth/signup`,
  [SIGNIN]: `${BASE_URL}/auth/signin`,
}