const InventarioClass = (() =>{
    class Inventario {
        //private atributes
        #productos; //Array of Obj
        constructor(){
            this.#productos= [];
        }
        getProductos(){
            return this.#productos;
        }
        addBSearchProducto(producto){
            if(this.#productos.length == 0){
                this.#productos[this.#productos.length] = producto;
            }
            else{
                let pos = this.rankForBSearch(producto.getId())[1];
                if (this.#productos[pos].getId() < producto.getId()){
                    pos += 1;
                }
                let thisProductosLength = this.#productos.length;
                for(let i = thisProductosLength - 1; i >= pos; i--){
                    this.#productos[i + 1] = this.#productos[i];
                }
                this.#productos[pos] = producto;
            }
            return this.#productos;
        }
        //este metodo es funcional, pero utilizar addBSearchProducto para mas eficiencia
        /*
        addProducto(producto){
            let pos;
            let i = 0;
            let aux = {}, aux2 = {};
            let thisProductosLength = this.#productos.length;
            if(thisProductosLength == 0){ //primer producto se agrega a primera posicion
                this.#productos[0] = producto;
                return this.#productos;
            }
            else if(thisProductosLength == 1){ // segundo producto se compara si es menor o mayor al primero
                if(this.#productos[0].getId() <= producto.getId() ){
                    this.#productos[1] = producto;
                    return this.#productos;
                }
                else if(this.#productos[0].getId() > producto.getId()){ // mayor se recorre el primer producto
                    this.#productos[1] = this.#productos[0];
                    this.#productos[0] = producto;
                    return this.#productos;
                }
                
            }
            //se checa cual es el camino mas corto en base a cual es la resta mas pequena 
            else if( Math.abs(producto.getId() - this.#productos[0].getId()) < Math.abs(producto.getId() - this.#productos[this.#productos.length - 1].getId())){
                //se inicia la busqueda desde primera posicion
                while(pos == undefined){
                    
                    if(this.#productos[i].getId() > producto.getId() && (this.#productos[i -1] == undefined || this.#productos[i - 1].getId() < producto.getId())){
                        pos = i; //indice donde iria new product
                    }
            
                    i++;
                }
                aux = this.#productos[pos]; //almacena el producto actual del indice donde iria new product
                
            }
            else{ // se inicia busqueda desde el ultimo producto
                i = this.#productos.length - 1;
                if(producto.getId() > this.#productos[i].getId()){ 
                    this.#productos[i + 1] = producto;
                    return this.#productos;
                }
                else{
                    while(pos == undefined){
                        if(producto.getId() < this.#productos[i].getId() && producto.getId() > this.#productos[i - 1].getId()){
                        pos = i;    
                        }
                        i--;
                    }
                    aux = this.#productos[pos];
                }
            }
            //se almacena tamaño del array de #productos para no hacer un ciclo infinito
            for(let i = pos; i < thisProductosLength; i++){ //empuja todos los #productos desde la pos obtenida
                aux2 = this.#productos[i + 1];
                this.#productos[i + 1] = aux;
                aux = aux2;
            }
            this.#productos[pos] = producto;
            return this.#productos;
        }
        */
        rankForBSearch(key){ //binary search
            let lo = 0;
            let hi = this.#productos.length - 1;
            let mid = 0;
            while(lo <= hi){
                mid = Math.floor(lo + (hi - lo) / 2);
                if(this.#productos[mid].getId() > key){
                    hi = mid - 1;
                }
                else if(this.#productos[mid].getId() < key){
                    lo = mid + 1;
                }
                else {
                    return [1,mid];
                }
            }
            return [null,mid];
        }
        binarySearch(code){ //si sale null, producto no encontrado
            let posicion = this.rankForBSearch(code);
            if(posicion[0] == null)    return posicion[0];
            else                    return this.#productos[posicion[1]];
        }

        deleteProducto(code){
                let aux =this.#productos[this.#productos.length -1];
                let aux2 ={}; //var donde se guarda temp los objetos que se están recorriendo en el arr
                let pos = this.rankForBSearch(code);
                if(pos[0] == null){ //producto no existe, no hace nada
                    return false;
                }
                else{
                    for(let i = this.#productos.length - 1; i > pos[1]; i--){ //sobreescritura de los objetos, empezando desde el objeto que se borrará
                        aux2 = this.#productos[i - 1];
                        this.#productos[i - 1] = aux;
                        aux = aux2;
                    }

                    this.#productos.pop();//se elimina el ultimo espacio que está vacio
                    return true;
                }   
            
        }
        //busqueda de obj sin meto
        searchProducto(code){ 
            let aux = 1;
            let value;
            for (let i = 0; i < this.#productos.length; i++) { //loopea todos los objetos y esconden los que no coinciden en la busqueda
                if (this.#productos[i].getId() == code) {
                    aux = 0;
                    value = this.#productos[i]; //si se regresa un objeto en verdadero
                } else if (aux == 1) {
                    value = null; //se regresa un null

                }
            }
            return value;
        }

    }
    return{
        Inventario : Inventario
    }
    })();
    export default InventarioClass;
