import { InMemoryCache, makeVar, Ref } from '@apollo/client';

function noop() {}

export const authVar = makeVar({
    token: null,
    userId:null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})

// export const tokenVar = makeVar(null)
// export const userIdVar = makeVar(null)
// export const loginVar = noop
// export const logoutVar = noop
// export const isAuthenticatedVar = makeVar(false)

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                authVar: {
                    read() {
                        return authVar()
                    }
                }
                // token: {
                //     read() {
                //         return tokenVar()
                //     }
                // },
                // userId: {
                //     read() {
                //         return userIdVar()
                //     }
                // },
                // login: {
                //     read() {
                //         return loginVar()
                //     }
                // },
                // logout: {
                //     read() {
                //         return logoutVar()
                //     }
                // },
                // isAuthenticated: {
                //     read() {
                //         return isAuthenticatedVar()
                //     }
                // },
            }
        }
    }
})
