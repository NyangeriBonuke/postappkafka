const TokenRepository = require('../repositories/tokenRepository')

class TokenUseCase{
   async postToken(token, user){
    try{
        if(!token){
            throw new Error('Token required')
        }
        if(!user){
            throw new Error('User required')
        }
        const authToken = await TokenRepository.createRefershToken({token, user})
        return authToken
    }
    catch(error){
        throw new Error(`Token usecase error ${error}`)
    }
   }
}

module.exports = new TokenUseCase