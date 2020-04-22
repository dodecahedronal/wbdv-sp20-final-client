export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const FIND_USER = 'FIND_USER';
export const FIND_ALL_USERS = 'FIND_ALL_USERS';
export const UPDATE_MYSELF = 'UPDATE_MYSELF'

export const addUser = (user) => ({
    type: ADD_USER,
    user
});

export const updateMyself = (user) => ({
    type: UPDATE_MYSELF,
    user
});
export const deleteUser = (userId) => ({
    type: DELETE_USER,
    userId
})

export const updateUser = (userId, user) => ({
    type: UPDATE_USER,
    userId,
    user
});

export const findUser = (user) => ({
    type: FIND_USER,
    user
});

export const findAllUsers = (users) => ({
    type: FIND_ALL_USERS,
    users
});

