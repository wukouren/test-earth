var _ = require('underscore');
var fs = require('fs');

module.exports = function(router){

  router.route('/url')
    .all(function(req,res,next){
      return next();
    })
    .get(function(req,res,next){
      var data = fs.readFileSync('routers/files/demo.json');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(eval("("+data+")")));
      return next();
    })
    .post(function(req, res, next){
      var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      var Backdatas = {};
      req.on('data',function(data){
        var datas = eval("("+data+")");
        datas['id'] = id;
        Backdatas = _.clone(datas);
        Backdatas.id = id;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({JMGoodsOrder:Backdatas,"JMStatus":{"code":0,"systime":1499004297}}));
        return next()
      })
    })


//结尾
}