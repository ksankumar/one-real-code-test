// useUserData.test.js
import { renderHook } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'
import {useGetData, request} from './useFetch'
import userMockData from '@mock/user.json'

fetchMock.enableMocks()
// Mock the useQuery function
jest.mock('react-query', () => ({
  useQuery: jest.fn()
}))

describe('useGetData', () => {
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

    const { result } = renderHook(() => useGetData('userData', 'user.json'))

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
      error: new Error('Network error')
    })

    const { result } = renderHook(() => useGetData('testCall', 'users.json'))
    // Assertions
    expect(result.current.data).toBe(null)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toEqual(new Error('Network error'))
  })

  it('fetch data with fetch api', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userMockData), {
      status: 200
    })

    const result = await request('testCall')
    // Assertions
    expect(result).toStrictEqual(userMockData)
  })
})
