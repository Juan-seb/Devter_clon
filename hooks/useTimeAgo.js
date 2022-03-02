import { useState, useEffect } from 'react'

const TIME_UNITS_IN_SECONDS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
]

const getTimeAgo = (timestamp) => {
  // Obtain the time now
  const timeNow = Date.now()
  // Calculate the difference between the current time and the time of the publicate in seconds
  const diffTime = (timeNow - timestamp) / 1000

  for (const [unit, unitInSeconds] of TIME_UNITS_IN_SECONDS) {

    // Obtain if the diffTime corresponds to days, hours, minutes or seconds
    if (diffTime > unitInSeconds || unit === 'second') {

      // Calculate the days, minutes, seconds, etc
      let value = Math.floor(diffTime / unitInSeconds)

      return {
        value,
        unit
      }

    }
  }

}

const useTimeAgo = (timestamp) => {

  const [timeago, setTimeago] = useState(() => getTimeAgo(timestamp))

  useEffect(() => {

    // Update the time ago
    let interval = setInterval(() => {
      const newTimeAgo = getTimeAgo(timestamp)
      setTimeago(newTimeAgo)
    }, 300000);

    return () => clearInterval(interval)

  }, [timestamp])

  // Format the time
  const rtf = new Intl.RelativeTimeFormat('es', { style: 'short' })
  // Obtain the value and the unit (day,hour,minute,etc)
  const { value, unit } = timeago
  // Use the - for put the format in past
  return rtf.format(-value, unit)

}

export { useTimeAgo }
