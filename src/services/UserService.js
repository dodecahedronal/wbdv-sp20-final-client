const URL = "https://salty-dawn-90176.herokuapp.com/api/"//'http://localhost:4000/api/';
const USER_URL = "https://salty-dawn-90176.herokuapp.com/api/user/" //'http://localhost:4000/api/user/';
const CURRENT_USER_URL = "https://salty-dawn-90176.herokuapp.com/api/current/" //'http://localhost:4000/api/current/';
const USERNAME_URL = "https://salty-dawn-90176.herokuapp.com/api/username/" //'http://localhost:4000/api/username/';

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
    } catch (err) {
        console.log(err)
    }
}

export const deleteUser = async (userId) => {
    let response = await fetch(URL + 'user/' + userId, {
        method: 'DELETE',
    })
    console.log(response)
    return await response.json()
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

export const currentUser = async () => {
    let response = await fetch(CURRENT_USER_URL, {
        credentials: 'include'
    })
    return await response.json()
}

export const updateUser = async (userId, user) => {
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
    } catch (err) {
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
    deleteUser,
    logout,
    currentUser,
    login,
    findUserByUsername,
    findUserById,
    updateUser,
    findAllUsers,
}
