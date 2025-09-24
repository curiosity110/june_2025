"use client"

import type { Trip } from "@/types/trip"
import { TripCard } from "./TripCard"

export type TripGridProps = {
  trips: Trip[]
  emptyMessage?: string
}

export const TripGrid = ({ trips, emptyMessage = "No trips match your filters yet." }: TripGridProps) => {
  if (trips.length === 0) {
    return (
      <div className="py-12 text-center text-purple-200 border border-dashed border-[#2c2c40] rounded-xl">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {trips.map((trip) => (
        <TripCard key={trip.slug} trip={trip} />
      ))}
    </div>
  )
}
