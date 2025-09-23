"use client"

export type TripPaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const TripPagination = ({ page, totalPages, onPageChange }: TripPaginationProps) => {
  if (totalPages <= 1) return null

  const canGoBack = page > 1
  const canGoForward = page < totalPages

  return (
    <div className="flex items-center justify-between bg-[#151525] border border-[#2c2c40] text-purple-200 px-4 py-3 rounded-lg">
      <span className="text-sm">
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={!canGoBack}
          onClick={() => canGoBack && onPageChange(page - 1)}
          className="px-3 py-2 rounded-md border border-[#2c2c40] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!canGoForward}
          onClick={() => canGoForward && onPageChange(page + 1)}
          className="px-3 py-2 rounded-md border border-[#2c2c40] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}
