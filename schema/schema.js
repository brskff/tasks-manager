const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID} = require('graphql')

const users = [
    {id: '1', email: 'test@mail.ru', password: '123456'},
    {id: '2', email: 'test2@mail.ru', password: '123456'},
    {id: '3', email: 'test3@mail.ru', password: '123456'},
    {id: '4', email: 'test4@mail.ru', password: '123456'},
]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    })
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return users.find(user => user.id === args.id)
            }
        }
    },

})

module.exports = new GraphQLSchema({
    query: Query
})
