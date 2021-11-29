import { gql } from '@apollo/client'

export const GET_SCHOOL = gql`
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
