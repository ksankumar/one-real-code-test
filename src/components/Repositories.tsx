import { useState, useMemo } from 'react'

export default function Repositories(props: {
  repoCount: number
  repoEndPoint: string
}) {
  const { repoCount, repoEndPoint } = props
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [showLoader, setLoader] = useState<boolean>(true)
  const [showError, setError] = useState<boolean>(false)
  const [repoData, setRepoData] = useState([])

  const PER_PAGE = 10
  const PAGE_COUNT = Math.ceil(repoCount / PER_PAGE)

  const linkStyle = {
    textDecoration: 'underline',
    color: 'blue',
    cursor: 'pointer',
    margin: '12px',
    padding: 0,
    border: 'none',
    background: 'none'
  }
  useMemo(async () => {
    try {
      let response: any = await fetch(
        `${repoEndPoint}?sort=updated&per_page=10&page=${currentPage}`
      )
      const data = await response.json()
      setRepoData(data)
      setLoader(false)
    } catch (error) {
      setError(true)
    }
  }, [currentPage, repoEndPoint])

  if (showLoader) return <div>Loading...</div>
  if (showError) return <div>Error loading repositories data</div>

  const dateFormat = (date: string) => {
    const options: any = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
    const today: Date = new Date(date)
    return today.toLocaleDateString('en-US', options)
  }
  return (
    <>
      <div className="col-12">
        <div className="card bg-soft shadow-soft border-light px-4">
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-soft pl-0">
              <strong
                className="h5 card-title mt-3 pl-3"
                data-testid={`count-${repoCount}`}
              >
                Repositories : {repoCount}
              </strong>
            </li>
            {repoData.map((item: any) => (
              <li key={item.id} className="list-group-item bg-soft pl-0">
                <a
                  key={item.id}
                  href={item.html_url}
                  target="_blank"
                  rel="opener noreferrer"
                >
                  <strong className="text-link">{item.name}</strong>
                </a>{' '}
                - {item.visibility} - Created on: {dateFormat(item.created_at)}
                <p>{item.description}</p>
                <div>
                  <strong>Language: </strong>
                  {item.language} {item.stargazers_count} |
                  <span className="star">{item.stargazers_count}</span> |
                  {item.license && item.license.name && (
                    <span> {item.license.name} | </span>
                  )}
                  <span> Updated on: {dateFormat(item.pushed_at)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {PER_PAGE < repoCount && (
        <div className="d-flex justify-center align-center mt-2">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            style={linkStyle}
          >
            <b>Previous</b>
          </button>
          <span>
            <b>{currentPage * 10}</b> of <b>{repoCount}</b>
          </span>
          {currentPage * 10 <= repoCount && (
            <button
              onClick={() =>
                currentPage < PAGE_COUNT && setCurrentPage(currentPage + 1)
              }
              style={linkStyle}
            >
              <b>Next</b>
            </button>
          )}
        </div>
      )}
    </>
  )
}
