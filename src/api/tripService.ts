import { products } from "@/lib/products"
import type { Trip, TripFilters, TripQueryResult } from "@/types/trip"

const catalog: Trip[] = Object.values(products).map((product) => ({
  ...product,
}))

export const getTripBySlug = (slug: string): Trip | undefined =>
  catalog.find((trip) => trip.slug === slug)

const applyFilters = (trips: Trip[], filters: TripFilters): Trip[] => {
  let filtered = trips

  if (filters.onlyFree) {
    filtered = filtered.filter((trip) => trip.isFree)
  }

  if (filters.onlyPaid) {
    filtered = filtered.filter((trip) => !trip.isFree)
  }

  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter((trip) => trip.category === filters.category)
  }

  if (filters.query) {
    const query = filters.query.toLowerCase()
    filtered = filtered.filter((trip) =>
      trip.title.toLowerCase().includes(query) ||
      trip.description.toLowerCase().includes(query)
    )
  }

  return filtered
}

export const listTrips = (filters: TripFilters = {}): TripQueryResult => {
  const pageSize = Math.max(1, filters.pageSize ?? 6)
  const requestedPage = Math.max(1, filters.page ?? 1)

  const filtered = applyFilters(catalog, filters)
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const page = Math.min(requestedPage, totalPages)
  const start = (page - 1) * pageSize

  return {
    items: filtered.slice(start, start + pageSize),
    total,
    page,
    totalPages,
  }
}

export const getTripCategories = (): Array<NonNullable<Trip["category"]>> => {
  const categories = new Set<NonNullable<Trip["category"]>>()
  catalog.forEach((trip) => {
    if (trip.category) {
      categories.add(trip.category)
    }
  })
  return Array.from(categories)
}
