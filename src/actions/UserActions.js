export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const FIND_USER = 'FIND_USER';
export const FIND_ALL_USERS = 'FIND_ALL_USERS';

export const addUser = (user) => ({
    type: ADD_USER,
    user
});

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

