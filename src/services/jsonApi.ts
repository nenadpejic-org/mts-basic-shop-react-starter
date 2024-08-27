const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_JSON_API_URL_PROD
  : import.meta.env.VITE_JSON_API_URL_DEV

type Query = Record<string, string | number | boolean>

const getQueryParams = (query?: Query) => {
  if (!query) return ''
  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(([, v]) => v !== ''),
  )
  if (Object.keys(filteredQuery).length === 0) return ''

  return `?${Object.entries(filteredQuery)
    .map(([key, value]) => `${key}=${value}`, [])
    .join('&')}`
}

type JsonApiProps = {
  endpoint: string
  init?: RequestInit
  query?: Query
  baseUrl?: string
}

export const jsonApi = async <JsonApiRes>({
  endpoint,
  init,
  query,
  baseUrl = BASE_URL,
}: JsonApiProps): Promise<JsonApiRes> => {
  try {
    const url = `${baseUrl}${endpoint}${getQueryParams(query)}`
    const res = await fetch(url, init)

    if (!res.ok) {
      let resError
      resError = (await res.json()) as Record<string, never>
      if (!Object.keys(resError).length) {
        resError = {
          status: res.status,
          message: res.statusText || 'Unhandled json-server error',
        }
      }
      return Promise.reject(resError)
    }

    const resData = (await res.json()) as JsonApiRes
    return resData
  } catch (error) {
    return Promise.reject(error)
  }
}
