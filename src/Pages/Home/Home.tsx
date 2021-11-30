import React, { useContext, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import Feed from '../../Components/Feed/Feed'
import Sidebar from '../../Components/Sidebar/Sidebar'

import './Home.scss'
import { UserContext } from '../../Components/Context/UserContext'

const GET_SCHOOL = gql`
  query Query($input: String) {
    getSchool(input: $input) {
      id
      schoolName
      logo
      primaryColor
      secondaryColor
    }
  }
`

const Home: React.FC = () => {
  const { setSchool } = useContext(UserContext)
  const { loading, error, data } = useQuery(GET_SCHOOL)

  useEffect(() => {
    if (data) {
      setSchool(data.getSchool)
    }
  }, [data])
  return (
    <div className="home_page_container">
      <Sidebar />
      <Feed />
    </div>
  )
}

export default Home
