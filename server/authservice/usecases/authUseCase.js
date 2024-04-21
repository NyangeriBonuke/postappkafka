const AuthRepository = require('../repositories/authRepository')
const bcrypt = require('bcrypt')

class AuthUseCase{
    async signUp(firstName, lastName, email, password){
        try{
            const userExists = await AuthRepository.findUser(email)
            if(userExists){
                throw new Error(`User already Exists`)
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const newUser = await AuthRepository.createUser({firstName, lastName, email, password: hashedPassword})
            return newUser
        }   
        catch(error){
            throw new Error(`Usecase signup error ${error}`)
        }
    }

    async login(email, password){
        try{
            const userExists = await AuthRepository.findUser(email)
            if(!userExists){
                throw new Error(`Wrong credentials`)
            }
            const checkUser = await bcrypt.compare(password, userExists.password)
            if(!checkUser){
                throw new Error(`Wrong credentials`)
            }
            return userExists
        }
        catch(error){
            throw new Error(`Usecase login error ${error}`)
        }
    }
}

module.exports = new AuthUseCase