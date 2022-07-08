const homecontroller = require('../app/http/controllers/homecontrollers')
const authcontrollers = require('../app/http/controllers/authcontrollers')
const cartcontrollers = require('../app/http/controllers/customers/cartconnection')

function initroutes(app){

    app.get('/',homecontroller().index)
    
    app.get('/cart',cartcontrollers().cart)
    
    app.get('/login',authcontrollers().login)
    
    app.get('/register', authcontrollers().register)
    app.post('/update-cart', cartcontrollers().update)

}


module.exports = initroutes