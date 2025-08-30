import type { FetchOptions, ofetch } from "ofetch"

export interface PetsListRequest {
  /**
   * User ID is actually user email
   */
  user_id: string
}

export type PetsListResponse = {
  code: "00"
  msg: "Success"
  data: Array<{
    pet_id: string
    pet_name: string
    pet_species_id: string
    pet_species: string
    pet_ras: string
    /**
     * Date format: YYYY-MM-DD
     */
    pet_birth_date: string
    pet_gender: string
    pet_weight: string
    pet_characteristic: string
    pet_foto: string
    microchip_id: string
    status_vaksin: string
    pet_color_utama: string
    pet_color_kedua: string
  }>
}

export const pets = (httpClient: typeof ofetch) => ({
  list: async (
    input: PetsListRequest,
    options?: FetchOptions,
  ): Promise<PetsListResponse> => {
    return httpClient<PetsListResponse>("/mobile/get-member", {
      method: "POST",
      body: input,
      ...options,
      responseType: "json",
    })
  },
})
