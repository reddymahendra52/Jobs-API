const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {

    // all the bcryptjs code is sent to mongoose middleware in the user schema only

    const user = await User.create({ ...req.body })

    // Again can be written in the schema model only instance method
    // const token = jwt.sign({ userId: user._id, name: user.name }, 'jwtsecret', { expiresIn: '30d' })

    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new UnauthenticatedError(' Invalid credentials')
    }
    //compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });

}

module.exports = {
    register,
    login
}