const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID} = require('graphql')
const Users = require('../models/User')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parent, args) {
                const user = new Users({
                    email: args.email,
                    password: args.password
                })
                return user.save()
            }
        }
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Users.findById(args.id)
            }
        }
    },

})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})
