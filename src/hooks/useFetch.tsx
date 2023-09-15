import { useQuery } from 'react-query'

export const request = async (
  url: string,
  method: string = 'GET'
): Promise<any> => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
  try {
    let response = await fetch(url, options)
    return await response.json()
  } catch (error) {
    return { error: error }
  }
}

export const useGetData = (queryKey: string, dataUrl: string) => {
  return useQuery([queryKey], () => request(dataUrl))
}
