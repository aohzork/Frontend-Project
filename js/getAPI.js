function getApi(url, array, length, f){

    let keys = Object.keys(array[0]);

    fetch(url).then((resp) => resp.json()).then(function(data){
        
        length = length || data.length;

        for(let i = 0; i < length; i++){
            for(let y = 0; y < keys.length; y++){
                array[i][keys[y]] = data[i][keys[y]];               
            }
        }

        f();

    }).catch(function(error){
        console.log("cannot fetch data from " + url);
    });
}