

// const API_USERS = "https://w3learnback-production.up.railway.app/api/users";
const API_USERS = "http://localhost:8003/api/users";


export async function createUser(newUser) {
    const response = await fetch (`${API_USERS}/addUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
    });
    const backResponse = await response.json();
    if(response.ok) {
        return backResponse
        console.log(backResponse);
        
    }else {
        if(backResponse) {
            throw backResponse;
        } else {
            throw new Error ("Error API create User")
        }
    }
}


export async function signin(values) {
    const response = await fetch (`${API_USERS}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
    });
    const backResponse = await response.json();
    if(response.ok) {
        return backResponse
        // console.log(backResponse);
        
    }else {
        if(backResponse) {
            throw backResponse;
        } else {
            throw new Error ("Error API login")
        }
    }
}

export async function getConnectedUser() {
    const response = await fetch(`${API_USERS}/userConnected`);
    const userC = await response.json();
    
    return userC
}

export async function logout() {
    const response = await fetch (`${API_USERS}/logout`)
}