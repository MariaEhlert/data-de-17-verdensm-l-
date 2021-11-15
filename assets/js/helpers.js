//Global funktioner - kan bruges over det hele og flere gange
export const myFetch = async (url) => {
    try{

        const response = await fetch(url);
        const result = await response.json();
        return result;
    }
    catch(err){
        //skriver `myFetch` for at bedre vise hvor fejlen er 
        console.error(`myFetch Error: ${err}`);
    }
}

