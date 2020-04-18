export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const addUser = (user) => ({
    type: ADD_USER,
    user
});

export const updateUser = (user) => ({
    type: UPDATE_USER,
    user
});

