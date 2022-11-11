const bcryptjs = require('bcryptjs')

// --

const comparePass = async (entryPassword, userPassword)=>{  
    return await bcryptjs.compare(entryPassword, userPassword)
 }

const hashPass = async entryPassword => {
    return await bcryptjs.hash(entryPassword, 8)
}

//  --

module.exports = {
    comparePass,
    hashPass,
}