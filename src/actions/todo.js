import {
    LOAD_TODOS_SUCCESS,
    LOAD_TODOS_FAILURE,

    ADD_TODOS_SUCCESS,
    ADD_TODOS_FAILURE,

    DELETE_TODOS,
    DELETE_TODOS_SUCCESS,
    DELETE_TODOS_FAILURE,

    EDIT_TODOS,
    EDIT_TODOS_SUCCESS,
    EDIT_TODOS_FAILURE,
    EDIT_ON,
    EDIT_OFF,

} from '../constants/todoTypes';

import axios from 'axios';
import Swal from "sweetalert2";
import { push } from "connected-react-router";

const API_URL = 'https://pomonatodo.herokuapp.com';
const request = axios.create({
    baseURL: API_URL,
    timeout: 10000
})

// start load todo
const loadTodosSuccess = (todos) => {
    return { type: LOAD_TODOS_SUCCESS, todos }
}

const loadTodosFailure = () => { return { type: LOAD_TODOS_FAILURE } }

export const loadTodos = (q = '', filter = 'all', skip = 0, limit = 10) => {
    return (dispatch, getState) => {
        let {router} = getState();
        const token = localStorage.token;
        if (token) {
            if (router.location.pathname !== "/") dispatch(push("/"));
            return request.get(`/todo/user?q=${q}&filter=${filter}&skip=${skip}&limit=${limit}`, {headers: {'Authorization': token}})
                .then(function (response) {
                    if (response.data.data.length > 0){
                        dispatch(loadTodosSuccess(response.data.data));
                    }
                    else
                        dispatch(loadTodosFailure());
                })
                .catch(function (error) {
                    console.log(error);
                    dispatch(loadTodosFailure())
                })
        } else {
            dispatch(push("/login"));
        } 
    }
}
// end load todo

// start edit todo

const editTodoSuccess = (todo) => ({
    type: EDIT_TODOS_SUCCESS,
    todo
})

const editTodoFailure = (id, title, priority, note, isDone) => ({
    type: EDIT_TODOS_FAILURE, id, title, priority, note, isDone
})

const editTodoRedux = (id, title, priority, note, isDone) => ({
    type: EDIT_TODOS, id, title, priority, note, isDone
})

export const editON = (id) => ({
    type: EDIT_ON, id
})

export const editOFF = (id) => ({
    type: EDIT_OFF, id
})

export const editTodo = (id, title, priority, note, isDone) => {
    return dispatch => {
        dispatch(editTodoRedux(id, title, priority, note, isDone))
        return request.put(`todo/${id}`, { title, priority, note, isDone }, {headers: {'Authorization': localStorage.token}})
            .then(function (response) {
                dispatch(editTodoSuccess(response.data.data))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(editTodoFailure(id, title, priority, note, isDone));
                Swal.fire({
                    title: "Update Error, Nothing changes",
                    timer: 1500,
                    type: "error",
                    showConfirmButton: false
                });
            });
    }
}

// end edit todo


//start delete todo
const deleteTodoRedux = (id) => ({
    type: DELETE_TODOS, id
})

const deleteTodoSuccess = (todo) => ({
    type: DELETE_TODOS_SUCCESS,
    todo
})

const deleteTodoFailure = (id, title, priority, note, isDone) => ({
    type: DELETE_TODOS_FAILURE, id, title, priority, note, isDone
})

export const deleteTodo = (id, title, priority, note, isDone) => {
    return dispatch => {
        dispatch(deleteTodoRedux(id))
        return request.delete(`todo/${id}`, {headers: {'Authorization': localStorage.token}})
            .then(function (response) {
                Swal.fire({
                    title: "Deleted Successfully",
                    timer: 1500,
                    type: "success",
                    showConfirmButton: false
                });
                dispatch(deleteTodoSuccess(response.data.data))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(deleteTodoFailure(id, title, priority, note, isDone))
                Swal.fire({
                    title: "Delete Error, Nothing changes",
                    timer: 1500,
                    type: "error",
                    showConfirmButton: false
                });
            });
    }
}

//end delete todo


// start add todo
const addTodoSuccess = (todo) => ({
    type: ADD_TODOS_SUCCESS,
    todo
})

const addTodoFailure = () => ({
    type: ADD_TODOS_FAILURE
})

export const addTodo = (title, priority, note) => {
    return dispatch => {
        return request.post('todo', { title, priority, note }, {headers: {'Authorization': localStorage.token}})
            .then(function (response) {
                dispatch(addTodoSuccess(response.data.data))
                dispatch(loadTodos())
            })
            .catch(function (error) {
                console.error(error);
                dispatch(addTodoFailure())
            });
    }
}

//end add contact

