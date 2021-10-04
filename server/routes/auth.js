const router = require('express').Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middlewares/requireLogin')


router.post('/signup', (req, res) => {
    const { name, email, password, pic } = req.body
    if(!name || !email || !password){
        res.status(422).json({ error : 'Please fill the required field' })
    }
    User.findOne( { email : email } )
    .then((savedUser) => {
        if(savedUser){
            res.status(422).json({ error : 'User already exists' })
        }
        bcrypt.hash(password, 10)
        .then(hashedPassword=>{
            const user = new User({
                name,
                email,
                password : hashedPassword,
                pic 
            })
            user.save()
            .then(user => {
                res.json( {message : 'User has been saved successfully'} )
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })

})

router.post('/login', (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.json({ error : 'Please add email or password'})
    }
    User.findOne({email : email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({ error : 'Invalid user'})
        }
        bcrypt.compare(password, savedUser.password)
        .then(matched=>{
            if(matched){
                // res.json({message: 'Logged in successfully'})
                const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                const {_id,name,email,followers,following,pic} = savedUser
                res.json({token, user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error : 'Invalid email or password'})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router