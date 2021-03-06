module.exports = {
    actualizar : function(nombre,precio,url,id,fs) {
        let arreglo =[]
        let guardados
        async function leer(){
            
            try{
                await fs.promises.readFile(`./datos/productos.js`,`utf-8`).then(contenido =>{
                   guardados =  contenido
                })
            }
            catch{
                console.log([])
                
            }
              
    
        }
    
        leer().then(()=>{
            if(guardados) arreglo = JSON.parse(guardados)
            arreglo.forEach((element,index) =>{
                if (element.id == id){
                    var objeto =  {
                        id : element.id,
                        title: nombre,
                        price: precio,
                        thumbnail: url
                    }
                  arreglo.splice(index,1,objeto)    
                }

            })
        
            async function agregar(){
                
                try{
                    await fs.promises.writeFile(`./datos/productos.js`,`${JSON.stringify(arreglo, null,'\t') }\n`)
                }
                catch{
                    console.log('error')
                    
                }
            }
            agregar()
            
        })
    }

}