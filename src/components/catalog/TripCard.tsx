"use client"

import Image from "next/image"
import Link from "next/link"
import type { Trip } from "@/types/trip"

export type TripCardProps = {
  trip: Trip
}

export const TripCard = ({ trip }: TripCardProps) => {
  return (
    <Link
      href={`/products/${trip.slug}`}
      className="block bg-[#151525] border border-[#2c2c40] p-6 rounded-xl shadow-md space-y-4 hover:shadow-xl transition-all duration-200"
    >
      {trip.image && (
        <Image
          src={trip.image}
          alt={trip.title}
          width={640}
          height={400}
          className="w-full h-auto rounded-lg border border-[#2c2c40]"
        />
      )}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white">{trip.title}</h3>
        <p className="text-purple-200 text-sm">{trip.description}</p>
      </div>
      <span className="inline-flex items-center gap-2 text-yellow-300 text-sm font-medium hover:underline">
        {trip.isFree ? "Download Free" : trip.ctaLabel}
      </span>
    </Link>
  )
}
