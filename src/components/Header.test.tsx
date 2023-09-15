import { render, screen } from '@testing-library/react'
import Header from '@components/Header'

test('renders header', () => {
  render(<Header />);
  const linkElement = screen.getByText(/Page Title/i);
  expect(linkElement).toBeInTheDocument();
});

// describe('Header component', () => {
//   it('should render a header with the given title', () => {
//     const { getByText } = screen
//     const header = render(<Header />)
//     const h1 = getByText('Page Title')
//     expect(h1).toBeInTheDocument()
//   })
// })
