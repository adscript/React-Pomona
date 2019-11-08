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

const todos = (state = [], action) => {
    let { type, id, title, priority, note, isDone, todos, todo } = action;
    switch (type) {
        case LOAD_TODOS_SUCCESS:
            return todos.map(
                item => ({
                    ...item,
                    onEdit: false,
                    isVisible: true
                }))

        case EDIT_ON:
            return state.map(
                item => ({
                    ...item,
                    ...(item.id === id && { onEdit: true })
                })
            )

        case EDIT_OFF:
            return state.map(
                item => ({
                    ...item,
                    ...(item.id === id && { onEdit: false })
                })
            )

        case EDIT_TODOS:
            return state.map(
                item => ({
                    ...item,
                    ...(item.id === id &&
                        {
                            onEdit: false,
                            title,
                            priority,
                            note,
                            isDone,
                        })
                })
            )

        case EDIT_TODOS_SUCCESS:
            return state.map(
                item => ({
                    ...item,
                    ...(item.id === todo.id &&
                        {
                            onEdit: false,
                            title: todo.title,
                            priority: todo.priority,
                            isVisible: true
                        })
                })
            )

        case EDIT_TODOS_FAILURE:
            return state.map(
                item => ({
                    ...item,
                    ...(item.id === id &&
                        {
                            title,
                            priority,
                            note,
                            isDone,
                            onEdit: false
                        })
                })
            )

        case DELETE_TODOS:
            return state.filter(
                item => { return (item.id !== id) }
            )

        case DELETE_TODOS_SUCCESS:
            return state.filter(
                item => { return (item.id !== todo.id) }
            )

        case DELETE_TODOS_FAILURE:
        case ADD_TODOS_SUCCESS:
            return [
                ...state,
                {
                    id,
                    title,
                    priority,
                    note,
                    isDone,
                    onEdit: false,
                    isVisible: true
                }
            ]

        case ADD_TODOS_FAILURE:
            return state.map(
                item => ({
                    ...item,
                    ...(item.id === id &&
                        {
                            onEdit: false
                        })
                })
            )

        case LOAD_TODOS_FAILURE:
        default:
            return state
    }
}

export default todos;