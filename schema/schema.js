const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID} = require('graphql')
const Users = require('../models/User')
const Departments = require('../models/Department')
const Tasks = require('../models/Task')
const {GraphQLBoolean} = require("graphql");
const {GraphQLList} = require("graphql");

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        phone: {type: GraphQLString},
        birthday: {type: GraphQLString},
        department: {
            type: DepartmentType,
            resolve(parent, args) {
                console.log(parent)
                return Departments.findById(parent.department)
            }
        },
        position: {type: GraphQLString},
        fio: {type: GraphQLString},
        role: {type: GraphQLString,},
    })
})

const DepartmentType = new GraphQLObjectType({
    name: 'Department',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        curator: {
            type: UserType,
            resolve(parent, args) {
                return Users.findById(parent.curator)
            }
        },
        chief: {
            type: UserType,
            resolve(parent, args) {
                return Users.findById(parent.chief)
            }
        },
        staff: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return Users.find({department: parent.id})
            }
        },
        curators: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                //TODO Исправить на динамику
                return Users.find({department: '60c77c5139527c0adca6b885'})
            }
        }
    })
})



const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: {
        id: {type: GraphQLID},
        from: {
            type: new GraphQLObjectType({
                name: 'From',
                fields: {
                    user: {
                        type: UserType,
                        resolve(parent, args) {
                            return Users.findById(parent.user)
                        }
                    },
                    department: {
                        type: DepartmentType,
                        resolve(parent, args) {
                            return Departments.findById(parent.department)
                        }
                    }
                }
            }),
        },
        to: {
            type: new GraphQLObjectType({
                name: 'To',
                fields: {
                    user: {
                        type: UserType,
                        resolve(parent, args) {
                            return Users.findById(parent.user)
                        }
                    },
                    department: {
                        type: DepartmentType,
                        resolve(parent, args) {
                            return Departments.findById(parent.department)
                        }
                    }
                }
            }),
        },
        status: {type: GraphQLString},
        priority: {type: GraphQLString},
        text: {type: GraphQLString},
        title: {type: GraphQLString},
        signature: {
            type: new GraphQLObjectType({
                name: 'Signature',
                fields: {
                    user: {type:GraphQLBoolean},
                    chief: {type: GraphQLBoolean},
                    curator: {type: GraphQLBoolean}
                }
            })
        },
        canceledText: {type: GraphQLString}
    }
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
        },
        addDepartment: {
            type: DepartmentType,
            args: {
                name: {type: GraphQLString}
            },
            resolve(parent, args) {
                const department = new Departments({
                    name: args.name
                })
                return department.save()
            }
        },
        updateDepartment: {
            type: DepartmentType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                chief: {type: GraphQLID},
                curator: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Departments.findByIdAndUpdate(
                    args.id,
                    {$set: {name: args.name, chief: args.chief, curator: args.curator}},
                    {new: true}
                )
            }
        },
        confirmTaskFromChief: {
            type: TaskType,
            args: {
                id: {type: GraphQLID},
                executor: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Tasks.findByIdAndUpdate(
                    args.id,
                    {$set: {'to.user': args.executor, 'signature.chief': true, status: 'В очереди'}},
                    {new: true}
                )
            }
        },
        confirmTaskFromCurator: {
            type: TaskType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Tasks.findByIdAndUpdate(
                    args.id,
                    {$set: { 'signature.curator': true, status: 'В очереди'}},
                    {new: true}
                )
            }
        },
        cancelTaskFromChief: {
            type: TaskType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Tasks.findByIdAndUpdate(
                    args.id,
                    {$set: { status: 'Отменено начальником отдела'}},
                    {new: true}
                )
            }
        },
        cancelTaskFromCurator: {
            type: TaskType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Tasks.findByIdAndUpdate(
                    args.id,
                    {$set: { status: 'Отменено куратором'}},
                    {new: true}
                )
            }
        },
        sendTaskToCurator: {
            type: TaskType,
            args: {
                id: {type: GraphQLID},
                executor: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Tasks.findByIdAndUpdate(
                    args.id,
                    {$set: {'to.user': args.executor, 'signature.chief': true, status: 'Согласование'}},
                    {new: true}
                )
            }
        },
        takeTask: {
            type: TaskType,
            args: {
                id: {type: GraphQLID},
                userId: {type: GraphQLID}
            },
            async resolve(parent, args) {
                const activeTask = await Tasks.findOne({'to.user': args.userId, status: 'Выполняется'})

                if (!activeTask) {
                    return Tasks.findByIdAndUpdate(
                        args.id,
                        {$set: { status: 'Выполняется'}},
                        {new: true}
                    )
                }
            }
        },
        okTask: {
            type: TaskType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Tasks.findByIdAndUpdate(
                    args.id,
                    {$set: {status: 'Выполнено'}},
                    {new: true}
                )
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
        },
        department: {
          type: DepartmentType,
          args: {id: {type: GraphQLID}},
          resolve(parent, args) {
              return Departments.findById(args.id)
          }
        },
        userEmail: {
            type: UserType,
            args: {email: {type: GraphQLString}},
            resolve(parent, args) {
                return Users.findOne({email: args.email})
            }
        },
        departments: {
            type: new GraphQLList(DepartmentType),
            resolve(parent,args) {
                return Departments.find()
            }
        },
        task: {
            type: TaskType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Tasks.findById(args.id)
            }
        },
        myQueueTask: {
            type: TaskType,
            args: {userId: {type: GraphQLID}},
            resolve(parent, args) {
                return Tasks.find({'to.user': args.userId, status: 'В очереди'} )
            }
        },
        myTask: {
            type: TaskType,
            args: {userId: {type: GraphQLID}},
            resolve(parent, args) {
                return Tasks.findOne({'to.user': args.userId, status: 'Выполняется'})
            }
        },
        deliveredTasks: {
          type: new GraphQLList(TaskType),
          args: {userId: {type: GraphQLID}},
          async resolve(parent, args) {
              const tasks = []
              const allTasks = await Tasks.find({'from.user': args.userId}).sort({priority: -1})
              allTasks.map(el => {
                  if (el.status !== 'Отменено начальником отдела' && el.status !=='Отменено куратором' && el.status !== 'Выполнено') {
                      tasks.push(el)
                  }
              })
              return tasks
          }
        },
        queueTasks: {
            type: new GraphQLList(TaskType),
            args: {userId: {type: GraphQLID}},
            resolve(parent, args){
                return Tasks.find({'to.user': args.userId, status: 'В очереди'})
            }
        },
        agreementTask: {
            type: new GraphQLList(TaskType),
            args: {userId: {type: GraphQLID}},
            async resolve(parent, args) {
                const tasks = []
                const user = await Users.findById(args.userId).populate('department')
                if (args.userId == user.department.chief) {
                    const chiefAgreement = await Tasks.find({'to.department': user.department._id, status: 'Согласование', 'signature.chief': false})
                    chiefAgreement.map(el => tasks.push(el))
                }

                const curatorAgreement = await Tasks.find({status: 'Согласование', 'signature.chief': true}).populate({path: 'to.department'})
                curatorAgreement.map(el => {
                    if (args.userId == el.to.department.curator) {
                        tasks.push(el)
                    }
                })

                return tasks
            }
        }
    },

})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})
