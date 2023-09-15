import { render, screen } from '@testing-library/react'
import Organizations from '@components/Organizations'
import orgData from '@mock/org.json'

jest.mock('@hooks/useFetch')

describe('Organization component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('displays organization data when loaded', async () => {
    // Mock the useGetData hook to return mockOrganizationData
    require('@hooks/useFetch').useGetData.mockReturnValue({
      data: orgData,
      isLoading: false,
      error: false
    })

    render(<Organizations organizationsEndpoint="org.json" />)
    await screen.findByText("Tom's Obvious, Minimal Language (and friends)")
    expect(
      screen.getByText("Tom's Obvious, Minimal Language (and friends)")
    ).toBeInTheDocument()
  })

  it('displays loading state while fetching data', async () => {
    // Mock the useGetData hook to indicate loading state
    require('@hooks/useFetch').useGetData.mockReturnValue({
      isLoading: true
    })

    render(<Organizations organizationsEndpoint="org.json" />)

    // Verify that loading state is displayed
    await screen.findByText('Loading...')
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays error message when there is an error', async () => {
    // Mock the useGetData hook to indicate an error
    require('@hooks/useFetch').useGetData.mockReturnValue({
      error: true
    })
    render(<Organizations organizationsEndpoint="org.json" />)
    // Verify that error message is displayed
    await screen.findByText('Error loading organization data')
    expect(
      screen.getByText('Error loading organization data')
    ).toBeInTheDocument()
  })
})
