import { act, render, screen } from '@testing-library/react'
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import { List } from '@pages/user/List'
import userListMockData from '@mock/list.json'

jest.mock('@hooks/useFetch')
// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    userName: 'mojombo' // Mock a user ID for testing purposes
  })
}))
describe('User-List component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('displays user-details data when loaded', async () => {
    // Mock the useGetData hook to return mockUserListData
    require('@hooks/useFetch').default.mockReturnValue({
      data: userListMockData,
      isLoading: false,
      error: false
    })

    render(
      <MemoryRouter initialEntries={['/users']}>
        <Routes>
          <Route path="/users" element={<List />} />
        </Routes>
      </MemoryRouter>
    )
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)) // Let the async code run
    })
    const itemListElements = screen.getAllByTestId('user-item');
    expect(itemListElements.length).toBe(userListMockData.length);
  })

  it('displays loading state while fetching data', async () => {
    // Mock the useGetData hook to indicate loading state
    require('@hooks/useFetch').default.mockReturnValue({
      isLoading: true
    })

    render(<List />)

    // Verify that loading state is displayed
    await screen.findByText('Loading...')
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays error message when there is an error', async () => {
    // Mock the useGetData hook to indicate an error
    require('@hooks/useFetch').default.mockReturnValue({
      error: true
    })
    render(<List />)
    // Verify that error message is displayed
    await screen.findByText('Error loading user details data')
    expect(
      screen.getByText('Error loading user details data')
    ).toBeInTheDocument()
  })
})
