import type { FetchOptions, ofetch } from "ofetch"

export interface LoginRequest {
  email: string
  password: string
}

export type LoginResponse =
  | {
      code: "00"
      msg: string
      data: {
        user_id: number
        auth_token: string
        name: string
        email: string
        phone: string
        id_number: null
        company_code: "TMD"
        default_address_id: number
        default_address: null
        delivery_pin: string
        wallet_balance: number
        foto_selfie: string
      }
    }
  | {
      code: "01"
      msg: string
      data: null
    }

export const auth = (httpClient: typeof ofetch) => ({
  login: async (
    input: LoginRequest,
    options?: FetchOptions,
  ): Promise<LoginResponse> => {
    return httpClient<LoginResponse>("/mobile/login", {
      method: "POST",
      body: input,
      ...options,
      responseType: "json",
    })
  },
})
