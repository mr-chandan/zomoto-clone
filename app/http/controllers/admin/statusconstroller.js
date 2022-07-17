const Order = require('../../../models/order')

function statuscontroller() {
    return {
        update(req, res) {
            Order.updateOne({ _id: req.body.orderId }, { status: req.body.status }, (err, data) => {
              if(err){
                res.redirect('/admin/orders')
              }
              //emit event
              const eventEmitter = req.app.get('eventEmitter')
              eventEmitter.emit('orderUpdated',{id:request.body.orderId,status:req.body.status})
              res.redirect('/admin/orders')
            })
        }

    }

}

module.exports = statuscontroller