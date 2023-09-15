import { render, screen, waitFor } from '@testing-library/react'
import Followers from '@components/Followers'
import followersData from '@mock/followers.json'

jest.mock('@hooks/useFetch')

describe('Followers Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  it('displays followers data when loaded', async () => {
    // Mock the useGetData hook to return mockFollowersData
    require('@hooks/useFetch').useGetData.mockReturnValue({
      data: followersData,
      isLoading: false,
      error: false
    })

    render(
      <Followers followersEndpoint="followers.json" noOfFollowers={23611} />
    )
    const followerIds = screen.getAllByTestId('follower-id')
    await waitFor(() => {
      expect(screen.getByText('23.6K')).toBeInTheDocument()
      expect(followerIds).toHaveLength(followersData.length)
    })
  })

  it('displays loading state while fetching data', () => {
    // Mock the useGetData hook to indicate loading state
    require('@hooks/useFetch').useGetData.mockReturnValue({
      isLoading: true
    })

    render(
      <Followers followersEndpoint="followers.json" noOfFollowers={23611} />
    )
    // Verify that loading state is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays error message when there is an error', () => {
    // Mock the useGetData hook to indicate an error
    require('@hooks/useFetch').useGetData.mockReturnValue({
      error: true
    })
    render(
      <Followers followersEndpoint="followers.json" noOfFollowers={23611} />
    )
    // Verify that error message is displayed
    expect(screen.getByText('Error loading followers data')).toBeInTheDocument()
  })
})
