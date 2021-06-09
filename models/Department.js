const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, unique: true, required: true},
    curator: {type: Types.ObjectId, ref: 'User' },
    chief: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Department', schema)