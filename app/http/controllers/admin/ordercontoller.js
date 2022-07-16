const Order = require('../../../models/order')

function orderController() {
    return {
        index(req, res) {
           Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').exec((err, Orders) => {
    
                return res.render('admin/orders')
             
           })
        }
    }
}

module.exports = orderController