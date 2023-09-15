import React from 'react'
import useGetData from '@hooks/useFetch'
import { Link } from 'react-router-dom'
import './style.css'

export function List() {
  let { isLoading, error, data } = useGetData(
    'userListCall',
    `${process.env.REACT_APP_DOMAIN}`
  )
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading user details data</div>

  return (
    <div className="row mt-6">
      <strong className="ml-5">Users: {data.length}</strong>
      <div className="row align-center justify-center mt-5">
        {data.map((item: any) => (
          <Link
            data-testid="user-item"
            key={item.login}
            className="fadeIn col-12 col-md-3 col-lg-2 mb-4 mb-md-5"
            to={`/user/${item.login}`}
          >
            <div className="profile-card mb-5 scale-up-center">
              <div className="card bg-primary shadow-soft border-light">
                <div className="row">
                  <div className="profile-image shadow-inset rounded-circle p-2 ml-4 mt-n5">
                    <img
                      src={item.avatar_url}
                      className="rounded-circle"
                      title={item.login}
                      alt={item.name}
                    />
                  </div>
                  <div className="card-body">
                    <strong className="text-link m-0">{item.login}</strong>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
