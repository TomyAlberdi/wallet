import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getErrorMessage = async (response: Response): Promise<string> => {
  try {
    const body = await response.json()
    if (typeof body?.message === "string" && body.message.length > 0) {
      return body.message
    }
  } catch {
    // Ignore parsing errors and fallback to generic message.
  }

  return `Request failed with status ${response.status}`
}

export const fetchJson = async <T,>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> => {
  const response = await fetch(input, init)

  if (!response.ok) {
    throw new Error(await getErrorMessage(response))
  }

  return (await response.json()) as T
}
