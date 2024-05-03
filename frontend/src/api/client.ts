import {Api} from "@/api/generated"

export const api = new Api({baseURL: import.meta.env.VITE_API_BASE_URL})
