import { act, render, screen } from '@testing-library/react'
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import Details from '@pages/user/Details'
import userMockData from '@mock/user.json'

jest.mock('@hooks/useFetch')
// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    userName: 'mojombo' // Mock a user ID for testing purposes
  })
}))
jest.mock(
  '@components/Organizations',
  () =>
    ({ organizationsEndpoint }: any) =>
      <div data-testid="org-endpoint">{organizationsEndpoint}</div>
)
jest.mock(
  '@components/Followers',
  () =>
    ({ followersEndpoint, noOfFollowers }: any) =>
      (
        <div data-testid="follower-endpoint">
          {followersEndpoint} - {noOfFollowers}
        </div>
      )
)
jest.mock(
  '@components/Repositories',
  () =>
    ({ repoCount, repoEndPoint }: any) =>
      (
        <div data-testid="repo-endpoint">
          Posts for user {repoCount} - {repoCount}
        </div>
      )
)

describe('User-Details component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('displays user-details data when loaded', async () => {
    // Mock the useGetData hook to return mockUserData
    require('@hooks/useFetch').default.mockReturnValue({
      data: userMockData,
      isLoading: false,
      error: false
    })

    render(
      <MemoryRouter initialEntries={['/user/mojombo']}>
        <Routes>
          <Route path="/user/:userName" element={<Details />} />
        </Routes>
      </MemoryRouter>
    )
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)) // Let the async code run
    })
    expect(screen.getByTestId('Tom Preston-Werner')).toBeInTheDocument()
  })

  it('displays loading state while fetching data', async () => {
    // Mock the useGetData hook to indicate loading state
    require('@hooks/useFetch').default.mockReturnValue({
      isLoading: true
    })

    render(<Details />)

    // Verify that loading state is displayed
    await screen.findByText('Loading...')
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays error message when there is an error', async () => {
    // Mock the useGetData hook to indicate an error
    require('@hooks/useFetch').default.mockReturnValue({
      error: true
    })
    render(<Details />)
    // Verify that error message is displayed
    await screen.findByText('Error loading user details data')
    expect(
      screen.getByText('Error loading user details data')
    ).toBeInTheDocument()
  })
})
