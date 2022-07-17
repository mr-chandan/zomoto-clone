const Order = require("../../../models/order")
const moment = require('moment')

function ordercontrollers() {
  return {
    store(req, res) {
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash('error', 'All fields are required')
        return res.redirect('/cart')
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
      });
      order
        .save()
        .then((result) => {
          req.flash("success", "order placed sucessfully");
          req.session.cart = "" //or delete req.session.cart
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "something went wrong");
          return res.redirect("/cart");
        });
    },
    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: {
          'createdAt': -1
        }
      });
      res.render('customers/orders', { orders: orders, moment: moment })

    }, async show(req, res) {
      const order = await Order.findById(req.params.id)
      //auth user
      if (req.user._id.toString() === order.customerId.toString()) {
        res.render('customers/singleorder', { order: order })
      } else {
        res.redirect('/')
      }
    }
  }
}

module.exports = ordercontrollers;
