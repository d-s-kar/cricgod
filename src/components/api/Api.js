const api_key="VdaDx5QdSDU";

//get all upcoming function

export const getMatches=()=>{
             const url= 'http://localhost:8080/matchList';
             //const url="https://cricapi.com/api/matches/"+api_key;
             return fetch(url).then((response)=>response.json()).catch((error)=>console.log(error));
}

export const getScore=(id)=>{
   //const url=`https://cricapi.com/api/cricketScore?unique_id=${id}&apikey=${api_key}`;
   const url=`http://localhost:8080/score/${id}`;
    return fetch(url).then((res)=>res.json()).catch((error)=>console.log(error));
} 

export const getSquad=(id)=>{
    //const url=`https://cricapi.com/api/fantasySummary?unique_id=${id}&apikey=${api_key}`;
    const url=`http://localhost:8080/teams/${id}`
    return fetch(url).then((res)=>res.json()).catch((error)=>console.log(error));
}

export const getLocalMatchList=()=>{
    const url=`http://localhost:8080/localMatchList`;
    return fetch(url).then((response)=>response.json()).catch((error)=>console.log(error));
}