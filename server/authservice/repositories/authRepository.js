const Auth = require('../models/authModel')

class AuthRepository{
    async createUser(userData){
        try{
            const user = await Auth.create(userData)
            return user
        }
        catch(error){
            throw new Error(`Repository create user error ${error}`)
        }
    }

    async findUser(email){
        try{
            const user = await Auth.findOne({email})
            return user
        }
        catch(error){
            throw new Error(`Repository find user error ${error}`)
        }
    }
}

module.exports = new AuthRepository