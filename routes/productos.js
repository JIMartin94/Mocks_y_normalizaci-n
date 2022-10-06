var express = require('express');
const Contenedor = require('../contenedor')
var router = express.Router();

const productos = new Contenedor('./productos.txt');

/* GET users listing. */


router.get('/agregarProductos', (req,res) =>{
  res.render('agregarProductos',{ title: 'Agregar de Productos' });
});

router.get('/',(req, res)=> {
  let objs = productos.getAll();
  objs.then( data =>{
    res.render('index',{prod: data});
  }).catch(error =>{
    res.send(error);
  })
});

router.get('/detalle/:id',(req,res) =>{
  let obj = productos.getById(req.params.id);
  obj.then( data =>{
    res.render('detalle',{prod: data})
  }).catch(error =>{
    res.send("producto no encontrados"+ error);
  })
});

router.post('/agregarProductos',({body},res)=>{
  let prod = { "title": body.title, "price": body.price, "thumbnail":body.thumbnail };
  let obj = productos.save(prod);
  obj.then( data =>{
    res.redirect('/productos');
  }).catch(error =>{
    res.send(error);
  })
});

router.put('/:id',({params,body},res)=>{
  let prod = { "title": body.title, "price": body.price, "thumbnail":body.thumbnail };
  let obj = productos.updateById(params.id,prod);
  obj.then( data =>{
    res.send(data);
  }).catch(error =>{
    res.send(error);
  })
});

router.delete('/:id',(req,res)=>{
  let obj = productos.deleteById(req.params.id);
  obj.then( data =>{
    res.send(data);
  }).catch(error =>{
    res.send(error);
  })
});

module.exports = router;
