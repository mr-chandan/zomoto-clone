const Menu = require('../../models/menu')

function homecontrollers() {
    return {
        index(req, res) {
            Menu.find().then(function (pizzas) {
                console.log(pizzas)
                return res.render('home', { pizzas: pizzas })
            })

        }
    }
}


module.exports = homecontrollers