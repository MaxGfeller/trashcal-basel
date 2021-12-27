export default function () {
  const buildURL = (params) => {
    const url = new URL('https://data.bs.ch/api/records/1.0/search/')
    url.searchParams.append('dataset', '100096')
    url.searchParams.append('sort', 'termin')
    url.searchParams.append('rows', 500)
    url.searchParams.append('refine.zone', params.zone)
    url.searchParams.append('refine.termin', params.date)
    url.searchParams.append('refine.art', params.type)

    return url.href
  }

  return {
    buildURL
  }
}