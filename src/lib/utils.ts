export const formatMetric = (key: string, value: number): string => {
  switch (key) {
    case 'latency':
      return `${value.toFixed(2)}ms`
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