import React, { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Header from '@components/Header'
import { List } from '@pages/user/List'
const queryClient = new QueryClient()
const Details = lazy(() => import('@pages/user/Details/index'))

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<List />} />
              <Route path="/users" element={<List />} />
              <Route path="/user/:userName" element={<Details />} />
            </Routes>
          </QueryClientProvider>
        </Suspense>
      </div>
    </>
  )
}

export default App
