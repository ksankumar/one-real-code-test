import React from 'react'
import './style.css'

import { useParams } from 'react-router-dom'
import useGetData from '@hooks/useFetch'
import Organizations from '@components/Organizations'
import Followers from '@components/Followers'
import Repositories from '@components/Repositories'

const Details = () => {
  const { userName } = useParams()
  let { isLoading, error, data } = useGetData(
    'detailsCall',
    `${process.env.REACT_APP_DOMAIN}/${userName}`
  )
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading user details data</div>
  return (
    <div className="fadeIn align-center justify-center m-4">
      <div className="row card bg-primary shadow-inset border-light m-2">
        <div className="col-sm-12 col-md-12 col-lg-3">
          <div className="image-wrapper">
            <img
              src={data.avatar_url}
              className="shadow-soft rounded"
              title={data.name}
              alt={data.name}
            />
            <div className="image-content">
              <div className="mb-2 user-title text-center text-primary" data-testid={data.name}>
                {data.name}
              </div>
              <div className="h6 font-weight-normal text-white text-center">
                {data.login}
              </div>
            </div>
          </div>
          <Organizations organizationsEndpoint={data.organizations_url} />
          <Followers
            followersEndpoint={data.followers_url}
            noOfFollowers={data.followers}
          />
        </div>
        <div className="col-sm-12 col-md-12 col-lg-7 p-0">
          <Repositories
            repoCount={data.public_repos}
            repoEndPoint={data.repos_url}
          />
        </div>
      </div>
    </div>
  )
}
export default Details
