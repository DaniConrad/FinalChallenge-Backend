class ProductsBaseDAO {

    constructor() { }

    getCart = async (_id) => { throw new Error('Method not implemented') }
    insertCart = async (newToInsert) => { throw new Error('Method not implemented') }
    updateCart = async (_id, newToUpdate) => { throw new Error('Method not implemented') }
    deleteCart =  async (_id) => { throw new Error('Method not implemented') }
}

module.exports = ProductsBaseDAO