import { useQuery } from 'react-query'

async function request(url: string, method: string = 'GET'): Promise<any> {
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

const useGetData = (queryKey: string, dataUrl: string) => {
  return useQuery([queryKey], () => request(dataUrl))
}

export default useGetData
