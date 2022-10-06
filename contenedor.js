const {promises:fs} = require("fs");

class Contenedor{

    constructor(archivo){
        this.archivo = archivo;
    }

    async save(prod){
        let objs = await this.getAll();
        let newId;
        if(objs.length == 0){
            newId =1;
        }else{
            newId = objs[objs.length-1].id + 1;
        }
        let producto={id: newId,...prod}
        let datos = [...objs,producto];
        try {
            await fs.writeFile(this.archivo,JSON.stringify(datos,null,2))
            return `El producto ${producto.id} se agrego exitosamente`
        } catch (error) {
            throw new Error(`Error al guardar los datos ${error}`);
        }
    }

    async getById(id){
        let objs = await this.getAll();
        let obj = objs.filter( o => o.id == id)
        if(obj.length != 0){
            return obj;
        }else{
            return `El producto con Id: ${id} no fue encontrado`
        }
    }

    async getAll(){
        try{
            const objs = await fs.readFile(this.archivo);
            return JSON.parse(objs);
        }catch(error){
            return 'No se pudieron obtener los productos';
        }
    }

    async updateById(id,objeto){
        let objs = [];
        objs = await this.getAll();  
        objs.forEach(p =>{
            if(p.id == id){
                p.title = objeto.title; 
                p.price = objeto.price;
                p.thumbnail = objeto.thumbnail;
            }
        })
        try {
            await fs.writeFile(this.archivo,JSON.stringify(objs,null,2));
            return `Producto ${objeto.title} fue actualizado`;
        } catch (error) {
            return `no se puede obtener el registro ${error}`
        }
    }

    async deleteById(id){
        let objs = await this.getAll();
        let obj = objs.filter( o => o.id != id)
        try {
            await fs.writeFile(this.archivo,JSON.stringify(obj,null,2))
            return obj
        } catch (error) {
            return `no se puede obtener el registro ${error}`
        }
    }

    async deleteAll(){
        try {
            await fs.writeFile(this.archivo,stringify([],null,2))
        } catch (error) {
            return `No se pudieron borrar los datos ${error}`
        }
    }

    async getProductoRandom(){
        try {
            const objs = await fs.readFile(this.archivo);
            let productosJson = JSON.parse(objs)
            let numeroRandom = Math.floor(Math.random()*productosJson.length)
            return productosJson[numeroRandom];
        } catch (error) {
            return error
        }
    }
}

module.exports = Contenedor

