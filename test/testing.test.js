const req = require('supertest')('http://127.0.0.1:8080')
const expect = require('chai').expect
const should = require('chai').should();
const ProductsController = require('../src/controllers/products_controller/products_controller')


describe('testing /api', () => {
    describe('GET', () => {
        it('/products Must return an array of products', async() => {
            const res = await req.get('/api/products')
            expect(res.body).should.be.an('object')
        })
    })

    describe('GET', () => {
        it('/cart Must return an array of products or empty', async() => {
            const res = await req.get('/api/cart/63322c8209e403cf31e8075e/products')
            expect(res.body).should.be.an('object')
        })
    })

    describe('POST', () => {
        const newProduct = {
            _id:"631fb3118ee4ae5e07163275",
            name: "other",
            img: "no",
            price: 151100,
            desc: "3kg",
            stock: 10,
            code: "Other",
            __v: 0,
            quantity: 3
          }

        it('/cart must push an item and return the updated cart', async() => {
            const res = await req.post('/api/cart/63322c8209e403cf31e8075e/products').send(newProduct)
            expect(res.status).to.eq(200)
            const cartProds = res.body.products.some(prod => prod.product === newProduct._id)
            expect(cartProds).to.eq(true)
        })
    })

    describe('POST', () => {
        const newProduct = 
        {
          _id: "631fb2f58ee4ae5e07163273",
          name: "Floor",
          img: "no",
          price: 1500,
          desc: "1kg",
          stock: 10,
          code: "Dani",
          __v: 0,
          quantity: 2
        }

        it('/cart must push an item and return the updated cart', async() => {
            const res = await req.post('/api/cart/63322c8209e403cf31e8075e/products').send(newProduct)
            expect(res.status).to.eq(200)
            const cartProds = res.body.products.some(prod => prod.product === newProduct._id)
            expect(cartProds).to.eq(true)
        })
    })

    describe('DELETE', () => {
        it('/cart must delete prod in cart and return it without the prod', async() => {
            const res = await req.delete('/api/cart/63322c8209e403cf31e8075e/products/631fb3118ee4ae5e07163275')
            expect(res.status).to.eq(200)
            const cartProds = res.body.products.some(prod => prod.product === "631fb3118ee4ae5e07163275")
            expect(cartProds).to.eq(false)
        })
    })

    describe('DELETE', () => {
        it('/cart must delte prod in cart, if the cart is empty delete it and return null', async() => {
            const res = await req.delete('/api/cart/63322c8209e403cf31e8075e/products/631fb2f58ee4ae5e07163273')
            expect(res.status).to.eq(200)
            expect(res.body).to.eq(null)
        })
    })

})