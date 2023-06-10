import InventarioClass from '../DB/class/inventario.mjs';
import ProductoClass from '../DB/class/productos.mjs';
import express from 'express';

const inventario = new InventarioClass.Inventario();
const app = express();
//todo lo recibido es un json
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Configurando el motor de plantillas EJS
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    res.render('../views/home.ejs', {title: 'productos', productos: []});
});

app.post('/productos',(req, res)=>{
    const newProduct = new ProductoClass.Producto(req.body.id, req.body.name, req.body.quantity, req.body.cost);
    inventario.addBSearchProducto(newProduct);//añade el obj producto al arr del inventario
    
    res.redirect('/productos');//redirecciona a la ruta /productos en metodo GET
});
app.get('/productos', function(req, res){
    const productos = inventario.getProductos();// array de productos, donde producto es un Obj
    res.render('../views/home.ejs', {title: 'productos',productos : productos});//renderiza la vista productos.ejs, pasando el array de productos
});

app.get('/productos/:id', function(req, res){
    const productFound = inventario.binarySearch(req.params.id);
    if(productFound == null) res.json({msg: "Producto no encontrado"});
    else res.json({
        id: productFound.getId(), nombre: productFound.getNombre(),
        cantidad: productFound.getCantidad(), costo: productFound.getCosto()
    });
});



app.listen(3000, () =>{
    console.log("Servidor corriendo en el puerto 3000");
});

