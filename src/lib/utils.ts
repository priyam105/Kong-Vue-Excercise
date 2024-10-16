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


export const timeAgo = (dateString: string) => {
  const now = Date.now()
  const pastDate = new Date(dateString).getTime()
  const timeDiff = now - pastDate

  if (timeDiff < 60000) return `${Math.floor(timeDiff / 1000)} seconds ago` // < 1 minute
  if (timeDiff < 3600000) return `${Math.floor(timeDiff / 60000)} minutes ago` // < 1 hour
  if (timeDiff < 86400000) return `${Math.floor(timeDiff / 3600000)} hours ago` // < 1 day
  return `${Math.floor(timeDiff / 86400000)} days ago` // >= 1 day

}
