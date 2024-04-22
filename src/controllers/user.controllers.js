const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const result = await User.findAll()
    return res.json(result)
});

const create = catchError(async(req, res) =>{
    const user = req.body
    const result = await User.create(user)
    return res.status(201).json(result)
});

const getOne = catchError(async(req, res)=>{
    const {id} = req.params
    const result = await User.findByPk(id)
    if (!result) return res.status(404).json({message: "User not found"})
    return res.json(result)
})

const remove = catchError(async (req,res)=>{
    const{id} = req.params

    const result = await User.destroy({where:{id:id}})
    if (!result) return res.status(404).json({message: "User not found"})
    return res.sendStatus(204)
})

const update = catchError(async (req,res)=>{
    const{id}= req.params
    const user = req.body

    const result = await User.update(user, {where:{id}, returning: true})
    if(result[0] ===0) return res.status(404).json({message: "User not found"})
    return res.json(result[1][0])
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}