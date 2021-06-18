import {gql} from '@apollo/client'

export const GET_USER = gql `
    query($id: ID) {
        user(id:$id) {
            fio
        }
    }
`

export const GET_DEPARTMENT = gql `
    query($id: ID) {
        department(id:$id) {
            name
            curator{
              id
            }
            chief{
              id
            }
  }
}
`

export const GET_DEPARTMENT_WITH_STAFF_AND_CURATORS = gql `
    query($id: ID) {
        department(id:$id) {
            name
            curator{
              id
            }
            chief{
              id
            }
            staff{
                id
                fio
            }
            curators{
                id
                fio
            }
  }
}
`

export const GET_DEPARTMENTS = gql `
    query {
      departments{
        id 
        name
        curator{
          id
        }
        chief{
          id
        }
      }
}
`

export const GET_DEPARTMENTS_WITH_STAFF  = gql `
    query {
      departments{
        id 
        name
        curator{
          id
        }
        chief{
          id
        }
        staff{
            id
            email
            fio
            phone
            birthday
            position
        }
      }
}
`

export const GET_AGREEMENT_TASKS = gql `
    query($userId: ID){
      agreementTask(userId: $userId){
        id
        title
        priority
        status
        from{
            user{
                fio
            }
        }
      }
}
`



