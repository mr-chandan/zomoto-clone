const homecontroller = require('../app/http/controllers/homecontrollers')
const authcontrollers = require('../app/http/controllers/authcontrollers')
const cartcontrollers = require('../app/http/controllers/customers/cartconnection')
const guest = require('../app/http/middlewares/guest')
function initroutes(app){

    app.get('/',homecontroller().index)




    app.get('/login',guest,authcontrollers().login)
    app.post('/login',authcontrollers().postlogin)


    app.get('/register', guest,authcontrollers().register)
    app.post('/register',authcontrollers().postregister)

    app.post('/logout',authcontrollers().logout)



    app.get('/cart',cartcontrollers().cart)
    app.post('/update-cart', cartcontrollers().update)

}


module.exports = initroutes