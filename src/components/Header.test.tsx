import { render, screen } from '@testing-library/react'
import Header from '@components/Header'

test('renders the header component', () => {
  const { getByAltText, getByText } = render(<Header />)

  // Check if the logo and page title are present
  const logo = getByAltText('Logo')
  expect(logo).toBeInTheDocument()

  const pageTitle = getByText('Page Title')
  expect(pageTitle).toBeInTheDocument()
})

// describe('Header component', () => {
//   it('should render a header with the given title', () => {
//     const { getByText } = screen
//     const header = render(<Header />)
//     const h1 = getByText('Page Title')
//     expect(h1).toBeInTheDocument()
//   })
// })
