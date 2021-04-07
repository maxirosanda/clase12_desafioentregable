module.exports = {
    actualizar : function(nombre:string,precio:string,url:string,id:string,fs) {
        let arreglo:any[] =[]
        let guardados:any
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
                    let objeto:any =  {
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