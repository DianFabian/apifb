var rutasP=require("express").Router();
var subirArchivo=require("../middlewares/subirArchivos");
//const fs = require('fs');
var {mostrarProductos, nuevoProducto, modificarProducto, borrarProducto, BuscarPorID}=require("../bd/productosBD");
 

rutasP.get("/api/mostrarProductos",async(req, res)=>{
    var productos = await mostrarProductos();
    //res.render("productos/mostrar",{productos}); 
    if(productos.length>0)
        res.status(200).json(productos);
    else
        res.status(400).json("No hay productos")
});


rutasP.post("/api/nuevoProductos", subirArchivo(), async(req,res)=>{
    req.body.foto=req.file.originalname;
    var error = await nuevoProducto(req.body);
    if(error ==0)
        res.status(200).json("Producto Registrado");
    else
        res.status(400).json("Error el registrar producto");
});


rutasP.get("/api/buscarProductoPorId/:id",async(req,res)=>{
    var productos=await BuscarPorID(req.params.id);
    if(productos==undefined)
        res.status(400).json("No se encontro el producto");
    else
        res.status(200).json(productos);
});


rutasP.post("/api/editarProductos",subirArchivo(),async(req,res)=>{
    
    if (req.file!=undefined){
        req.body.foto=req.file.originalname;
    }
    else{
        req.body.foto="algo"
    }
    console.log(req.file);

    var error=await modificarProducto(req.body);
    if(error==0){
        res.status(200).json("Producto actualizado");
    }
    else{
        res.status(400).json("Error al actualizar el producto");
    }
});


rutasP.get("/api/borrarProductos/:id",async(req,res)=>{
    var error=await borrarProducto(req.params.id);
    if(error==0){
        res.status(200).json("Producto borrado");
    }
    else{
        res.status(400).json("Error al borrar el producto")
    }
});

module.exports=rutasP;