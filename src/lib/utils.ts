/**
 * Formats a given metric based on its key.
 *
 * @param key - The key representing the type of metric (e.g., 'latency', 'uptime', 'requests', 'errors').
 * @param value - The numeric value of the metric to be formatted.
 * @returns A formatted string representation of the metric.
 *
 * - 'latency': Returns the value in milliseconds with two decimal places (e.g., '123.45ms').
 * - 'uptime': Returns the value as a percentage with two decimal places (e.g., '99.99%').
 * - 'requests': Returns the value in thousands with no decimal places (e.g., '1K').
 * - 'errors': Returns the value as a percentage with two decimal places (e.g., '0.50%').
 * - Default: Returns the value as a string.
 */
export const formatMetric = (key: string, value: number): string => {
  switch (key) {
    case 'latency':
      return `${value?.toFixed(2)}ms`
    case 'uptime':
      return `${(value * 100).toFixed(2)}%`
    case 'requests':
      return `${(value / 1000).toFixed(0)}K`
    case 'errors':
      return `${(value * 100).toFixed(2)}%`
    default:
      return value.toString()
  }
}

/**
 * Calculates the time elapsed since a given date string and returns it in a human-readable format.
 *
 * @param dateString - The date string to calculate the time elapsed from.
 * @returns A string representing the time elapsed since the given date in seconds, minutes, hours, or days.
 */
export const timeAgo = (dateString: string) => {
  const now = Date.now()
  const pastDate = new Date(dateString).getTime()
  const timeDiff = now - pastDate

  if (timeDiff < 60000) return `${Math.floor(timeDiff / 1000)} seconds ago` // < 1 minute
  if (timeDiff < 3600000) return `${Math.floor(timeDiff / 60000)} minutes ago` // < 1 hour
  if (timeDiff < 86400000) return `${Math.floor(timeDiff / 3600000)} hours ago` // < 1 day
  return `${Math.floor(timeDiff / 86400000)} days ago` // >= 1 day
}

/**
 * Retrieves the user's name from localStorage.
 * If the user's name is not found in localStorage, it returns a default value of "Guest".
 *
 * @returns {string} The user's name from localStorage or the default fallback value "Guest".
 */
export const getUserName = (): string => {
  return localStorage.getItem('userName') ?? 'Guest' // Fallback to "Guest" if no user name is found
}
