const CartBaseDAO = require('../cart_base_DAO')
const Cart = require('./cart_model')

class CartMongoDAO extends CartBaseDAO {

    constructor() {
        super();
    }
        
    async verifyCartUser(userID){
        const userCart = await Cart.findOne({user : userID})
        return userCart
    }

    async deleteCartByID(cartID){
        return await Cart.findByIdAndDelete(
            {_id: cartID}, 
            (err, cart) => {
            if (err) console.log(err)
              else return cart
        }
        ).clone()
    }

    async saveChanges(){
        this.cart.save()
    }

    async createCart(userID){
        const newCart = await Cart({user: userID,   products: []})
        await newCart.save()

        return newCart._id
    }

    async getProdInCartByID(cartID, prodID){
        this.cart =  await Cart.findOne({_id : cartID}, {products : { $elemMatch: { product: prodID } }})

        return this.cart
    }

    async updateCart(cartID, prodID, quantity){
        return await Cart.findOneAndUpdate(
            { _id: cartID},
                {$push: 
                    { products: {product: prodID, quantity}}
            },
            {new: true}
        )
        .exec()
        .then(res => {return res})
    }

    async deleteProd(cartID, prodID){
        return await Cart.findOneAndUpdate(
            {_id: cartID},
            { $pull: 
                { products: 
                    { product: 
                        { _id: prodID }
                    }
                }
            },
            {new: true}
            )
            .exec()
            .then(res => {return res})
    }

    async getCartByID(cartID){
        await Cart.findOne({_id: cartID})
    }
}  
    
module.exports = CartMongoDAO