const Token = require('../models/tokenModel')

class TokenRepository{
    async createRefershToken(tokenData){
        try{
            if (!tokenData.user) {
                throw new Error('User data is required to create a refresh token');
            }
            const refreshToken = await Token.create(tokenData)
            return refreshToken
        }
        catch(error){
            throw new Error(`Repository create refresh token error ${error}`)
        }
    }
}

module.exports = new TokenRepository