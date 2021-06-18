import { InMemoryCache, makeVar, Ref } from '@apollo/client';

function noop() {}

export const authVar = makeVar({
    token: null,
    userId:null,
    role: 'user',
    login: noop,
    logout: noop,
    isAuthenticated: false
})


export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                authVar: {
                    read() {
                        return authVar()
                    }
                }
            }
        }
    }
})
