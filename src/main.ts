import { ofetch, type FetchOptions } from "ofetch"

import { auth } from "./auth"

const DEFAULT_OPTIONS = {
  baseURL: "https://order.satwagia.app/public/api/",
}

/**
 * Creates a Satwagia API client
 * @param options - Optional fetch configuration options. Auth header format: "auth_token": <jwt>
 * @returns Client instance with HTTP client and auth methods
 */
export const createClient = (options: FetchOptions = {}) => {
  const httpClient = ofetch.create({
    ...DEFAULT_OPTIONS,
    ...options,
  })

  return {
    _httpClient: httpClient,
    get auth() {
      return auth(httpClient)
    },
  }
}
