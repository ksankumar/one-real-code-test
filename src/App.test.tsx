import { act, render, screen } from '@testing-library/react'
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import App from './App'

test('renders Home page', async () => {
  render(
    <MemoryRouter initialEntries={['/users']}>
      <App />
    </MemoryRouter>
  )
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Let the async code run
  })
  const linkElement = screen.getByText('Users: 30')
  expect(linkElement).toBeInTheDocument()
})
