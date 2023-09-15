import { act, render, screen, waitFor } from '@testing-library/react'
import Repositories from '@components/Repositories'
import repositoriesData from '@mock/repos.json'
import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks()

describe('Repositories Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('displays repositories data when loaded', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(repositoriesData), {
      status: 200
    })
    await act(async () => {
      render(<Repositories repoEndPoint="repos.json" repoCount={10} />)
    })

    await screen.findByText('Repositories : 10')
    expect(screen.getByTestId('count-10')).toBeInTheDocument()
    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length - 1).toBe(10)
  })

  it('displays error data when network error', async () => {
    fetchMock.mockRejectedValue(new Error('Network error'))
    await act(async () => {
      render(<Repositories repoEndPoint="repos.json" repoCount={10} />)
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
    expect(screen.getByText('Error loading repositories data')).toBeInTheDocument()
  })
})
