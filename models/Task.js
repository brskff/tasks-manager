const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    from: {
        user: {type: Types.ObjectId, ref: 'User'},
        department: {type: Types.ObjectId, ref: 'Department'}
    },
    to: {
        department: {type: Types.ObjectId, ref: 'Department'},
        user: {type: Types.ObjectId, ref: 'User'}
    },
    status: {type: String},
    priority: {type: String},
    text: {type: String},
    title: {type: String},
    signature: {
        user: {type:Boolean},
        chief: {type: Boolean},
        curator: {type: Boolean}
    },
    canceledText: {type: String}
})

module.exports = model('Task', schema)

