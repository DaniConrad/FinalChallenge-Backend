

class LoginDTO {
    constructor(){}

    sendUser(user) {
        const {_id, email, name, phone} = user
        return {_id, email, name, phone}
    }
}

module.exports = LoginDTO