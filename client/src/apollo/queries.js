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

export const MY_TASK = gql `
    query($userId: ID) {
        myTask(userId:$userId) {
            id
            title
            status
            priority
            from {
                user {
                    fio
                }
            }
        }
    }
`

export const DELIVERED_TASKS = gql `
    query($userId: ID) {
        deliveredTasks(userId: $userId) {
            id
            title
            status
            priority
            to{
                user {
                    fio
                }
            }
        }
    }
`

export const QUEUE_TASKS = gql `
    query($userId: ID) {
        queueTasks(userId: $userId) {
            id
            title
            status
            priority
            from{
                user {
                    fio
                }
            }
        }
    }
`

export const GET_TASK = gql `
    query($id: ID) {
task(id:$id) {
    id
    status
    text
    title
    from {
      user {
        fio
      }
      department {
        name
      }
    }
    to{
      user{
        fio
      }
      department{
        id
        name
        curator{
          id
          fio
        }
        staff{
          id
          fio
        }
      }
    }
    signature{
      chief
      curator
    }
  }
}
`



