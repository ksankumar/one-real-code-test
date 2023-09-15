import { act, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import userListMockData from '@mock/list.json'

jest.mock('@hooks/useFetch')

test('renders Home page', async () => {
  require('@hooks/useFetch').useGetData.mockReturnValue({
    data: userListMockData,
    isLoading: false,
    error: false
  })

  render(
    <MemoryRouter initialEntries={['/users']}>
      <App />
    </MemoryRouter>
  )
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Let the async code run
  })
  const linkElement = screen.getByText('Users: 30')
  expect(linkElement).toBeInTheDocument()
})
