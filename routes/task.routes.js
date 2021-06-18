const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const Tasks = require('../models/Task')
const Users = require('../models/User')

router.post('/create', auth, async (req, res) => {
    try {

        const {form} = req.body

        const userFrom = await Users.findById(form.userId)

        const task = new Tasks({
            from: {
                user: form.userId,
                department: userFrom.department
            },
            to: {
                user: null,
                department: form.department
            },
            status: 'Согласование',
            priority: form.priority,
            title: form.title,
            text: form.text,
            signature: {
                user: false,
                chief: false,
                curator: false
            }
        })

        await task.save()

        res.status(201).json({ task })

    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'Что то пошло не так, попробуйте снова'})
    }
})

module.exports = router