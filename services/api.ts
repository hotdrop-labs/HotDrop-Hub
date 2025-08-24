
const BASE_URL = 'http://192.168.1.65:3000/api/'

export const fetchPosts = async ({query}:{query:string}) => {


    const response = await fetch(`${BASE_URL}${query}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    if(!response.ok){
        throw new Error("Failed to fetch posts")
    }
    return await response.json();
}



export const fetchUser = async ({query, id}:{query:string, id:string}) => {

    const response = await fetch(`${BASE_URL}${query}?id=${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    if(!response.ok){
        throw new Error("Failed to fetch user")
    }
    return await response.json();
}

type userDataTypes = {
    email: string,
    username: string,
    password: string
}

export const createUser = async (query: string, userData: userDataTypes) => {

    try{
        const response = await fetch(`${BASE_URL}${query}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
        const result = await response.json()
        console.log(result)
        return result
    }catch{
        console.error("No se pudo enviar el fetch")
    }
    
}
export const fetchScrims = async ({query}:{query:string}) => {
    const response = await fetch(`${BASE_URL}${query}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
    }
    })

    if(!response.ok){
        throw new Error("Failed to fetch scrims")
    }
    return await response.json();
}

export type scrimDataTypes = {
    title: string,
    hostId: string | undefined,
    date: string, 
    startTime: string,
    maxTeams: string,
    map: string,
    mode: string,
    teamSize: string,
    applications: string,
    cost: string,
    prizePool: string,
    status: string,
    registrations: [{
        _id: string,
        teamId: string,
        slotNumber: string
    }]
}

export const createScrim = async (query: string, scrimData: scrimDataTypes) => {

    try{
        const response = await fetch(`${BASE_URL}${query}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scrimData)
        })

        const result = await response.json()
        return result
    }catch{
        console.error("No se pudo enviar el fetch")
    }
    
}
export const fetchScrim = async ({query, _id}: {query: string, _id: string}) => {
    const response = await fetch(`${BASE_URL}${query}?_id=${_id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
        throw new Error("Failed to fetch scrim")
    }
    return await response.json();
}

export const fetchSquads = async (query: string) => {
    const res = await fetch(`${BASE_URL}${query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return await res.json()
}
export const createSquadAPI = async ({query, _id, name}: {query: string, _id: string, name: string}) => {
    if(_id === "NOT_FOUND") return "FAILED"
    const res = await fetch(`${BASE_URL}${query}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({_id, name})
    })
    return await res.json()
} 

type slotType = {
    _id: string,
    teamId: string | undefined
}


export const editScrim = async ({_id, teamId}:slotType) => {
    try{
        if(teamId !== undefined){
        const res = await fetch(`${BASE_URL}scrims/addTeam`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"

            },
            body: JSON.stringify({_id, teamId})
        })
        if(!res.ok) return res.json()
        return await res.json()
        }
        return "teamId canot be undefined"
    }catch(err){
        return err
    }
    
}