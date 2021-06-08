const {GraphQLObjectType, GraphQLString, GraphQLSchema} = require('graphql')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    })
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}}
        }
    },
    resolve(parent, args) {

    }
})

module.exports = new GraphQLSchema({
    query: Query
})
