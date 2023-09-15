import React from 'react'
import { useParams } from 'react-router-dom'
import useGetData from '@hooks/useFetch'

const Followers = (props: { followersEndpoint: string; noOfFollowers: number }) => {
  const { userName } = useParams()
  const { followersEndpoint, noOfFollowers } = props
  let { isLoading, error, data } = useGetData(
    'followersCall',
    `${followersEndpoint}?per_page=5`
  )
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading followers data</div>

  const numberFormat = (n: number) => {
    if (n < 1e3) return n
    if (n >= 1e3 && n < 1e6) return `${(n / 1e3).toFixed(1)}K`
    if (n >= 1e6 && n < 1e9) return `${(n / 1e6).toFixed(1)}M`
    if (n >= 1e9 && n < 1e12) return `${(n / 1e9).toFixed(1)}B`
    if (n >= 1e12) return `${(n / 1e12).toFixed(1)}T`
  }

  const followerStyle: any = {
    ul: {
      display: 'flex',
      justifyDontent: 'flex-start',
      listStyleType: 'none'
    },
    li: {
      marginRight: '-0.8em',
      zIndex: 1,
      transition: 'transform .5s ease'
    },
    image: {
      width: '3rem',
      height: '3rem',
      borderRadius: '50%',
      border: '3px solid white'
    },
    span: {
      zIndex: 1,
      display: 'flex',
      width: '3rem',
      height: '3rem',
      borderRadius: '50%',
      border: '3px solid #05c3f9',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.65em',
      backgroundColor: '#e6e7ee',
      transition: 'transform .5s ease'
    }
  }

  return (
    <>
      <h3 className="h5 mb-2">
        <b>Followers </b>
        <small>{numberFormat(noOfFollowers)}</small>
      </h3>
      <ul style={followerStyle.ul} className="p-0 follower-list">
        {data.map((item: any) => (
          <a
            key={item.id}
            href={`https://github.com/${item.login}`}
            target="_blank"
            rel="opener noreferrer"
            data-testid="follower-id"
          >
            <li style={followerStyle.li}>
              <img
                style={followerStyle.image}
                src={item.avatar_url}
                title={item.login}
                alt={item.login}
              />
            </li>
          </a>
        ))}
        <a
          href={`https://github.com/${userName}?tab=followers`}
          target="_blank"
          rel="opener noreferrer"
        >
          <li style={followerStyle.span}>
            <b>+{noOfFollowers < 6 ? noOfFollowers : noOfFollowers - 5}</b>
          </li>
        </a>
      </ul>
    </>
  )
}

export default Followers
