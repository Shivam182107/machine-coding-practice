async function fetchData(skip){
    try{
        let response= await fetch(`https://dummyjson.com/recipes?limit=6&skip=${skip}`);
        // fetch('https://dummyjson.com/recipes?limit=10&skip=10&select=name,image')
        if(!response.ok)throw new Error("Sorry Data Can't be fetch,Error ouccered");
        return await response.json();

    }
    catch(e){
        console.log(e.message);
    }
}
export {fetchData};
