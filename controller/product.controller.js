var db=require('../db')
module.exports.index = (req, res) => {
    res.render('products/index.pug',{
        products:db.get('products').value()
    })
}