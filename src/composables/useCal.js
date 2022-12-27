import * as ics from 'ics'

export default function () {
  const downloadEvents = (events) => {
    const { value } = ics.createEvents(events)

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(value))
    element.setAttribute('download', 'Abfuhrtermine.ics')

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  return {
    downloadEvents
  }
}