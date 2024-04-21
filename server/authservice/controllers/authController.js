const AuthUseCase = require('../usecases/authUseCase')
const TokenUseCase = require('../usecases/tokenUseCase')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class AuthController{
    async userSignUp(req, res){
        try{
            const {firstName, lastName, email, password} = req.body
            if(!firstName || !lastName || !email || !password){
                res.status.json('Wrong Credentials')
            }

            const newUser = await AuthUseCase.signUp(firstName, lastName, email, password)
            if(newUser){
                const accessToken = jwt.sign({"username": firstName}, process.env.access_token_secret, {expiresIn: '10s'})
                const refreshToken = jwt.sign({"username": firstName}, process.env.refresh_token_secret, {expiresIn: "30s"})
                await TokenUseCase.postToken(refreshToken, newUser._id)
                res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 1000})
                res.json(accessToken)
            }

        }
        catch(error){
            res.status(400).json(`Controller singup error ${error}`)
        }
    }

    async userLogin(req, res){
        try{
            const {email, password} = req.body
            if(!email || !password){
                res.status(400).json('Wrong credentials')
            }

            const foundUser = await AuthUseCase.login(email, password)
            if(!foundUser){
                return res.status(400).json('User not found')
            }
            const accessToken = jwt.sign({'username': foundUser.firstName}, process.env.access_token_secret, {expiresIn: '10s'})
            const refreshToken = jwt.sign({"username": foundUser.firstName}, process.env.refresh_token_secret, {expiresIn: "1d"})
            await TokenUseCase.postToken(refreshToken, foundUser._id)
            res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 1000})
            res.json(accessToken)
        }
        catch(error){
            res.status(400).json(`Controller login error ${error}`)
        }
    }
}

module.exports = new AuthController