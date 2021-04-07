module.exports = {
    guardar : function(nombre:string,precio:string,url:string,fs) {
        let arreglo:any[] =[]
        let guardados:any
        let cont:number
        async function leer(){
            
            try{
                await fs.promises.readFile(`./datos/productos.js`,`utf-8`).then(contenido =>{
                guardados =  contenido
                })
                await fs.promises.readFile(`./datos/cont.js`,`utf-8`).then(contenido =>{
                    cont = parseInt(contenido)
                    })
            }
            catch{
                console.log([])
                
            }
              
    
        }
    
        leer().then(()=>{
            if(guardados) arreglo = JSON.parse(guardados)
            cont = cont + 1
            let objeto:any =  {
                id :cont,
                title: nombre,
                price: precio,
                thumbnail: url
            }
            arreglo.push(objeto)
            async function agregar(){
                
                try{
                    await fs.promises.writeFile(`./datos/productos.js`,`${JSON.stringify(arreglo, null,'\t') }  \n`)
                    await fs.promises.writeFile(`./datos/cont.js`,`${cont}  \n`)
                }
                catch{
                    console.log('error')
                    
                }
            }
            agregar()
            
        })
    }

}