export function calculateDifferenceDate(dateString) {
  const date = new Date(dateString)
  const currentDate = new Date()
  const difference = (currentDate - date)/1000
  switch (true) {
    case difference > 145152000: {
      return '5+ years ago'
    }
    case difference > 29030400: {
      const year = Math.floor(difference/29030400)
      return `${year>1 ? year : ''} ${year>1 ? 'years' : 'a year'} ago`
    }
    case difference > 2419200: {
      const month = Math.floor(difference/2419200)
      return `${month} ${month>1 ? 'months' : 'a month'} ago`
    }
    case difference > 604800: {
      const week = Math.floor(difference/604800)
      return `${week} ${week>1 ? 'weeks' : 'a week'} ago`
    }
    case difference > 86400: {
      const day = Math.floor(difference/86400)
      return `${day} ${day>1 ? 'days' : 'a day'} ago`
    }
    case difference > 3600: {
      const hour = Math.floor(difference/3600)
      return `${hour} ${hour>1 ? 'hours' : 'an hour'} ago`
    }
    case difference > 60: {
      const minute = Math.floor(difference/60)
      return `${minute} ${minute>1 ? 'minutes' : 'a minute'} ago`
    }
  }
}

export function stringToColor(string) {
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    hash = ((hash << 6) + hash) | string.charCodeAt(i)
  }

  const hexColor = (hash | 0x000000).toString(16)
  return "#" + "000000".substring(0, 6 - hexColor.length) + hexColor
}