"use client"

import { useEffect, useMemo, useState } from "react"
import { TripFilterBar, TripFilterMode } from "./TripFilterBar"
import { TripGrid } from "./TripGrid"
import { TripPagination } from "./TripPagination"
import { getTripCategories, listTrips } from "@/api/tripService"
import type { TripFilters } from "@/types/trip"

const PAGE_SIZE = 6

export const TripsList = () => {
  const [mode, setMode] = useState<TripFilterMode>("all")
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string>("all")
  const [page, setPage] = useState(1)

  const categories = useMemo(() => getTripCategories(), [])

  const { items, total, totalPages } = useMemo(() => {
    const filters: TripFilters = {
      query: search.trim() || undefined,
      onlyFree: mode === "free",
      onlyPaid: mode === "paid",
      category: (category || "all") as TripFilters["category"],
      page,
      pageSize: PAGE_SIZE,
    }

    return listTrips(filters)
  }, [search, mode, category, page])

  useEffect(() => {
    setPage(1)
  }, [mode, search, category])

  return (
    <section className="bg-[#0f0f1c] px-6 py-20 text-white">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-heading font-bold text-yellow-300">Digital Resources</h1>
          <p className="text-purple-300 max-w-2xl mx-auto">
            Browse free and premium playbooks to accelerate your creator business. Filter by price, category, or keyword to
            find the perfect resource.
          </p>
          <p className="text-sm text-purple-400">Showing {items.length} of {total} resources</p>
        </header>

        <TripFilterBar
          search={search}
          mode={mode}
          categories={categories}
          selectedCategory={category}
          onSearchChange={setSearch}
          onModeChange={setMode}
          onCategoryChange={setCategory}
        />

        <TripGrid trips={items} />

        <TripPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </section>
  )
}
