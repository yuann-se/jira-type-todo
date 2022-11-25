export const timeSince = (date: number) => {
  const now = new Date()
  const nowSeconds = now.getTime()
  const dateSec = date
  const seconds = Math.floor((nowSeconds - dateSec) / 1000)

  let interval = Math.floor(seconds / 86400)
  if (interval >= 1 && interval <= 6) {
    if (interval === 1) return `${interval} day`
    else return `${interval} days`
  } else if (interval > 6) {
    let created = new Date(dateSec)
    return created.toLocaleDateString()
  }

  interval = Math.floor(seconds / 3600)
  if (interval >= 1) {
    if (interval === 1) return `${interval} hour`
    else return `${interval} hours`
  }

  interval = Math.floor(seconds / 60)
  if (interval >= 1) {
    if (interval === 1) return `${interval} minute`
    else return `${interval} minutes`
  } else if (interval < 1) return 'less than a minute'
}
