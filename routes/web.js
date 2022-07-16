const homecontroller = require('../app/http/controllers/homecontrollers')
const authcontrollers = require('../app/http/controllers/authcontrollers')
const cartcontrollers = require('../app/http/controllers/customers/cartconnection')
const guest = require('../app/http/middlewares/guest')
const ordercontrollers = require('../app/http/controllers/customers/ordercontrollers')
const adminordercontrollers = require('../app/http/controllers/admin/ordercontoller')
const auth = require('../app/http/middlewares/auth')
function initroutes(app){

    app.get('/',homecontroller().index)




    app.get('/login',guest,authcontrollers().login)
    app.post('/login',authcontrollers().postlogin)


    app.get('/register', guest,authcontrollers().register)
    app.post('/register',authcontrollers().postregister)

    app.post('/logout',authcontrollers().logout)



    app.get('/cart',cartcontrollers().cart)
    app.post('/update-cart', cartcontrollers().update)

    app.post('/orders',auth,ordercontrollers().store)

    app.get('/customers/orders',auth,ordercontrollers().index)

    //admin

    app.get('/admin/orders',auth,adminordercontrollers().index)

}


module.exports = initroutes