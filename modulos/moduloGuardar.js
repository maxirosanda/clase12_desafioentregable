module.exports = {
    guardar : function(nombre,precio,url,fs) {
        var arrego =[]
        var guardados
        var cont
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
            if(guardados) arrego = JSON.parse(guardados)
            cont = cont + 1
            var objeto =  {
                id :cont,
                title: nombre,
                price: precio,
                thumbnail: url
            }
            arrego.push(objeto)
            async function agregar(){
                
                try{
                    await fs.promises.writeFile(`./datos/productos.js`,`${JSON.stringify(arrego, null,'\t') }  \n`)
                    await fs.promises.writeFile(`./datos/cont.js`,`${cont}  \n`)
                }
                catch{
                    console.log('error')
                    
                }
            }
            agregar(this.archivo)
            
        })
    }

}