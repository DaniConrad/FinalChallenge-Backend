

class LoginDTO {
    constructor(){}

    sendUser(user) {
        const {_id, email, name, phone, role} = user
        return {_id, email, name, phone, role}
    }
}

module.exports = LoginDTO