import { useQuery } from 'react-query'

export const request = async (url: string): Promise<any> => {
  // const options = {
  //   method,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json'
  //   }
  // }
  try {
    let response = await fetch(url)
    return await response.json()
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`)
  }
}

export const useGetData = (queryKey: string, dataUrl: string) => {
  return useQuery([queryKey], () => request(dataUrl))
}
