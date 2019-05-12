import moment from 'moment'

export let dateToYear = (date) => {
  return moment(date).format('YYYY')
}
export let dateToMonth = (date) => {
  return moment(date).format('MMM YYYY')
}
export let dateToWeek = (date) => {
  return moment(date).format('GGGG-[W]WW')
}
export let dateToDay = (date) => {
  return moment(date).format('YYYY-MM-DD')
}
export let dateFormatter = (date, type) => {
  switch (type) {
    case 'day':
      return moment(date).format('YYYY-MM-DD')
      break
    case 'week':
      return moment(date).format('GGGG-[W]WW')
      break
    case 'month':
      return moment(date).format('MMM YYYY')
      break
    case 'year':
      return moment(date).format('YYYY')
      break
    case 'beauty':
      return moment(date).format('MMMM Do YYYY')
      break
  }
}
export let formatNumber = (num) => {
  let numString = Math.round(num).toString()
  let numberFormatMapping = [
    [6, 'm'],
    [3, 'k']
  ]
  for (let [numberOfDigits, replacement] of numberFormatMapping) {
    if (numString.length > numberOfDigits) {
      let decimal = ''
      if (numString[numString.length - numberOfDigits] !== '0') {
        decimal = '.' + numString[numString.length - numberOfDigits]
      }
      numString = numString.substr(0, numString.length - numberOfDigits) + decimal + replacement
      break
    }
  }
  return numString
}
export const groupData = (data, type) => {
  return data.reduce((date, current) => {
    if (date.indexOf(dateFormatter(current.day, type)) < 0) {
      date.push(dateFormatter(current.day, type))
    }
    return date
  }, [])
    .map((date) => {
      return {
        date: date,
        downloads: data.filter(el => dateFormatter(el.day, type) === date)
          .map(el => el.downloads)
          .reduce((total, download) => total + download)
      }
    })
    .map(element => element.downloads)
}
export let removeDuplicate = (a, b) => {
  if (a.indexOf(b) < 0) {
    a.push(b)
  }
  return a
}
