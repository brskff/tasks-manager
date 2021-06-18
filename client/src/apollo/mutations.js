import {gql} from '@apollo/client'

export const ADD_DEPARTMENT = gql `
    mutation($name: String) {
      addDepartment(name: $name) {
        id
      }
    }
`

export const UPDATE_DEPARTMENT = gql `
    mutation($id: ID, $name: String, $curator: ID, $chief: ID){
        updateDepartment(id: $id, name:$name, curator: $curator, chief: $chief) {
           id 
        }
    }    
`