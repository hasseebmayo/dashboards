"use client"

import { usePathname } from "next/navigation"

export function useCurrentPath() {
  const pathname = usePathname()

  const isActive = (itemUrl: string) => {
    // Exact match for root paths
    if (
      itemUrl === "/admin" ||
      itemUrl === "/doctor" ||
      itemUrl === "/patient"
    ) {
      return pathname === itemUrl
    }

    // For sub-paths, check if current path starts with item URL
    return pathname.startsWith(itemUrl)
  }

  return { pathname, isActive }
}
