const URL = 'http://localhost:4000/api/';//"https://salty-dawn-90176.herokuapp.com/api/"
const USER_URL = 'http://localhost:4000/api/user/';//"https://salty-dawn-90176.herokuapp.com/api/user/"
const CURRENT_USER_URL = 'http://localhost:4000/api/current/';//"https://salty-dawn-90176.herokuapp.com/api/current/"
const USERNAME_URL = 'http://localhost:4000/api/username/';//"https://salty-dawn-90176.herokuapp.com/api/username/"

export const createUser = async (user) => {
    try {
        let response = await fetch(URL + 'register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'

        });
        console.log(response)
        return await response.json();
    }catch(err){
        console.log(err)
    }
}

export const login = async (user) => {
    try {
        let response = await fetch(URL + 'login', {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
            },
            credentials: 'include'//required
        });

        if (response.status == 200)
            return response.json()
        else
            return null
    } catch (err) {
        console.log(err)
    }
}

export const logout = async () =>
    await fetch(URL + 'logout', {
        method: "POST",
        credentials: 'include'
    })

export const currentUser = async() => {
    let response = await fetch(CURRENT_USER_URL, {
        credentials: 'include'
    })
    return await response.json()
}

export const updateUser = async(userId, user) => {
    console.log(userId)
    try {
        let response = await fetch(URL + 'user/' + userId, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'

        });
        console.log(response)
        return await response.json();
    }catch(err){
        console.log(err)
    }
}

export const findUserByUsername = (uname) =>
    fetch(USERNAME_URL + uname).then(response => response.json())

export const findUserById = (uid) =>
    fetch(USER_URL + uid).then(response => response.json());

export const findAllUsers = () => fetch(USER_URL).then(response => response.json());

export default {
    createUser,
    logout,
    currentUser,
    login,
    findUserByUsername,
    findUserById,
    updateUser,
    findAllUsers,
}
