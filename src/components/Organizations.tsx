import React from 'react'
import useGetData from '@hooks/useFetch'

const Organizations = (props: { organizationsEndpoint: string }) => {
  const { organizationsEndpoint } = props
  let { isLoading, error, data } = useGetData(
    'organizationCall',
    organizationsEndpoint
  )
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading organization data</div>

  const imageStyle = {
    width: '8%'
  }
  return (
    <>
      <h3 className="h5 mb-2">
        <b>Organizations</b>
      </h3>
      {data.map((item: any) => (
        <a
          key={item.id}
          href={`https://github.com/${item.login}`}
          rel="opener noreferrer"
          target="_blank"
          data-testid={`org-${item.login}`}
        >
          <div className="row org-card ">
            <div className="d-flex align-center">
              <img
                style={imageStyle}
                src={item.avatar_url}
                title={item.login}
                alt={item.login}
                className="f-left org-img ml-3"
              />
              <div className="ml-2 h6 font-weight-normal text-gray">
                {item.description || item.login}
              </div>
            </div>
          </div>
        </a>
      ))}
    </>
  )
}

export default Organizations
