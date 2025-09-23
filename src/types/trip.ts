import type { Product } from "@/lib/products"

export type Trip = Product & {
  tags?: string[]
}

export type TripFilters = {
  query?: string
  onlyFree?: boolean
  onlyPaid?: boolean
  category?: Product["category"] | "all"
  page?: number
  pageSize?: number
}

export type TripQueryResult = {
  items: Trip[]
  total: number
  page: number
  totalPages: number
}
