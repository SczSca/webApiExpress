const ProductoClass = (() =>{
    class Producto {
        #_id;
        #_nombre;
        #_cantidad;
        #_costo;

        constructor(id,nombre, cantidad, costo){
            
            this.#_id = id;
            this.#_nombre = nombre;
            this.#_cantidad = cantidad;
            this.#_costo = costo;
        }
        getId(){
            return this.#_id;
        }
        getNombre(){
            return this.#_nombre;
        }
        getCosto(){
            return this.#_costo;
        }
        getCantidad(){
            return this.#_cantidad;
        }

    }
    return {
        Producto: Producto
    };
})();
export default ProductoClass;