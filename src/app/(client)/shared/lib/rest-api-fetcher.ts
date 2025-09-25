import ky from 'ky'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const restApiFetcher = ky.create({
  prefixUrl: BASE_URL,
  timeout: 30000,
  retry: 2,
})
