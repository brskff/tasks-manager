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

export const CONFIRM_TASK_FROM_CHIEF = gql `
    mutation($id: ID, $executor: ID){
        confirmTaskFromChief(id: $id, executor: $executor){
            id
        }
    }
`

export const SEND_TASK_TO_CHIEF = gql `
    mutation($id: ID, $executor: ID){
        sendTaskToCurator(id: $id, executor: $executor){
            id
        }
    }
`

export const CONFIRM_TASK_FROM_CURATOR = gql `
    mutation($id: ID){
        confirmTaskFromCurator(id: $id){
            id
        }
    }
`

export const CANCEL_TASK_FROM_CHIEF = gql `
    mutation($id: ID){
        cancelTaskFromChief(id: $id){
            id
        }
    }
`

export const CANCEL_TASK_FROM_CURATOR = gql `
    mutation($id: ID){
        cancelTaskFromCurator(id: $id){
            id
        }
    }
`

