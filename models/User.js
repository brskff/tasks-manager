const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, return: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String},
    birthday: {type: String, required: true},
    department: {type: Types.ObjectId, ref: 'Department'},
    position: {type: String, required: true},
    role: {type: String, default: 'user'},
    fio: {type: String}
})

module.exports = model('User', schema)