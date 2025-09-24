"use client"

import clsx from "clsx"

export type TripFilterMode = "all" | "free" | "paid"

export type TripFilterBarProps = {
  search: string
  mode: TripFilterMode
  categories: string[]
  selectedCategory: string
  onSearchChange: (value: string) => void
  onModeChange: (mode: TripFilterMode) => void
  onCategoryChange: (category: string) => void
}

const filterOptions: Array<{ label: string; value: TripFilterMode }> = [
  { label: "All", value: "all" },
  { label: "Free", value: "free" },
  { label: "Premium", value: "paid" },
]

export const TripFilterBar = ({
  search,
  mode,
  categories,
  selectedCategory,
  onSearchChange,
  onModeChange,
  onCategoryChange,
}: TripFilterBarProps) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-[#151525] border border-[#2c2c40] px-4 py-4 rounded-xl">
      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search resources..."
        className="w-full lg:w-72 px-4 py-2 rounded-md bg-[#0f0f1c] border border-[#2c2c40] text-white placeholder-purple-400"
      />
      <div className="flex flex-wrap gap-2 items-center">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onModeChange(option.value)}
            className={clsx(
              "px-3 py-2 text-sm rounded-md border border-[#2c2c40] transition",
              mode === option.value
                ? "bg-yellow-400 text-black font-semibold"
                : "bg-[#0f0f1c] text-purple-200 hover:border-yellow-400"
            )}
          >
            {option.label}
          </button>
        ))}
        <select
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="px-3 py-2 text-sm rounded-md bg-[#0f0f1c] border border-[#2c2c40] text-purple-200"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
