async function fetchProduct(){
    try{
        let ProductResponse=await fetch("https://dummyjson.com/products");
        if(!ProductResponse.ok) throw new Error("Problem in Ftech Request");
        return await ProductResponse.json();
    }catch(e){
        console.log(e.message);
    }
}


async function fetchProductbyid(id){
    try{
        let ProductResponse=await fetch(`https://dummyjson.com/products/${id}`)
        if(!ProductResponse.ok) throw new Error("Problem in Ftech Request");
        return await ProductResponse.json();
    }catch(e){
        console.log(e.message);
    }
}
export {fetchProduct,fetchProductbyid};