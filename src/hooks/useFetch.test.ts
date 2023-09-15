// useUserData.test.js
import { renderHook } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'
import { useGetData, request } from './useFetch'
import userMockData from '@mock/user.json'

fetchMock.enableMocks()
// Mock the useQuery function
jest.mock('react-query', () => ({
  useQuery: jest.fn()
}))

describe('Use Fetch data', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('fetches user data successfully', async () => {
    // Mock the useQuery hook to return data
    jest.spyOn(require('react-query'), 'useQuery').mockReturnValue({
      data: userMockData,
      isLoading: false,
      error: null
    })

    const { result } = renderHook(() => useGetData('userData', 'https://api.github.com/users/mojombo'))

    // Assertions
    expect(result.current.data).toEqual(userMockData)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('handles fetch error', async () => {
    // Mock the useQuery hook to return an error
    jest.spyOn(require('react-query'), 'useQuery').mockReturnValue({
      data: null,
      isLoading: false,
      error: 'Error: Network error'
    })

    const { result } = renderHook(() => useGetData('testCall', 'users.json'))
    // Assertions
    expect(result.current.data).toBe(null)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toEqual('Error: Network error')
  })

  it('fetch data with success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userMockData), {
      status: 200
    })

    const result = await request('https://api.github.com/users/mojombo')
    // Assertions
    expect(result).toStrictEqual(userMockData)
  })

  it('fetch data with error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))

    try {
      await request('https://api.github.com/users/mojombo')
    } catch (error: any) {
      expect(error.message).toEqual('Error: Network error')
    }
    expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/users/mojombo');
  })
})
