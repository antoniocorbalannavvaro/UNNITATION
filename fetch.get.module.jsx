function getPromiseData(path)
{
    return new Promise((resolve, reject) =>{
        
        const xhtml = new XMLHttpRequest();
        
        xhtml.open('GET',`/api/enum/${path}`, true);
        
        xhtml.onreadystatechange = function(){
            if(this.readyState === 4){
                if(this.status !== 200){
                    reject(new Error('Invalid response from the server.'))
                }
                
                resolve(this.responseText);
            }
        }

        xhtml.send();
    })
}

async function getData(path){
    try{
        let data = await getPromiseData(path);
        data = JSON.parse(data);
        return data
    }
    
    catch(err){
        console.error(err);
    }
}

export default getData;