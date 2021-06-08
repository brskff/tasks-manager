import { InMemoryCache, makeVar } from '@apollo/client';

function noop() {}

export const tokenVar = makeVar(null)
export const userIdVar = makeVar(null)
export const loginVar = noop
export const logoutVar = noop
export const isAuthenticatedVar = false

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                token: {
                    read() {
                        return tokenVar()
                    }
                },
                userId: {
                    read() {
                        return userIdVar()
                    }
                },
                login: {
                    read() {
                        return loginVar()
                    }
                },
                logout: {
                    read() {
                        return logoutVar()
                    }
                },
                isAuthenticated: {
                    read() {
                        return isAuthenticatedVar()
                    }
                },
            }
        }
    }
})
