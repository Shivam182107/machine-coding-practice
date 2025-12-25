

async function fetchNotes() {
    try {
        let NoteRespone = await fetch("http://localhost:3000/Notes");
        if (!NoteRespone.ok) throw new Error("Sorry There is problem in Note Fetch Request ")
        return await NoteRespone.json();
    }
    catch (e) {
        console.log(e.message);
    }
}
async function CreateNote(data) {
    try {
        let CreateResponse = await fetch("http://localhost:3000/Notes", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(data)
        })
        if (!CreateResponse.ok) throw new Error("Sorry There is problem in Note post Request ")
        return await CreateResponse.json();

    }
    catch (e) {
        console.log(e.message)
    }

}
async function EditNote(data) {

    try {
        let EditResponse = await fetch(`http://localhost:3000/Notes/${data.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(data)
        })
        if (!EditResponse.ok) throw new Error("Sorry There is problem in Note patch Request ")
        return await EditResponse.json();

    }
    catch (e) {
        console.log(e.message)
    }

}
async function DeleteNote(id) {

    try {
        let EditResponse = await fetch(`http://localhost:3000/Notes/${id}`, {
            method: "DELETE",

        })
        if (!EditResponse.ok) throw new Error("Sorry There is problem in Note patch Request ")


    }
    catch (e) {
        console.log(e.message)
    }

}

async function fetchTodos() {
    try {
        let TodoRespone = await fetch("http://localhost:3000/Todos");
        if (!TodoRespone.ok) throw new Error("Sorry There is problem in Todo Fetch Request ")
        return await TodoRespone.json();
    }
    catch (e) {
        console.log(e.message);
    }
}

async function CreateTodo(data) {
    try {
        let TodoRespone = await fetch("http://localhost:3000/Todos", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(data)
        })
        if (!TodoRespone) throw new Error("Sorry There is problem in Todo post Request ");
        return await TodoRespone.json();
    }
    catch (e) {
        console.log(e.message);
    }
}
async function EditTodo(data) {
    try {
        let TodoResponse=await fetch(`http://localhost:3000/Todos/${data.id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(data)
        })
        if(!TodoResponse.ok)throw new Error("Sorry There is problem in Todo patch Request ");
        return await TodoResponse.json();
    } catch (e) {
        console.log(e.message);
    }
}
 async function DeleteTodo(id){
    try{
        let TodoRespone=await fetch(`http://localhost:3000/Todos/${id}`,{
            method:"DELETE"
          
        })
        if(!TodoRespone.ok) throw new Error("Sorry There is problem in Todo delete Request ")
    }catch(e){
        console.log(e.message);
    }
 } 
export { fetchNotes, CreateNote, EditNote, DeleteNote, fetchTodos, CreateTodo,EditTodo,DeleteTodo }