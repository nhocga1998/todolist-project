import * as types from '../constants/ActionType';

var s4 = () => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5);

}

var generateID = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + s4()
        + '-' + s4() + s4() + s4();
}

var findIndex = (task, id) => {
    var result = -1;
    task.forEach((task, index) => {
        if (task.id === id) {
            result = index;

        }
    });
    return result;
}

var data = JSON.parse(localStorage.getItem('task'));
var initialState = data ? data : [];
var id = '';
var index = -1;
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            }
            if (!task.id) {
                task.id = generateID();
                state.push(task);
            }
            else {
                index = findIndex(state, task.id);
                state[index] = task;
            }

            localStorage.setItem('task', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
            id = action.id
            index = findIndex(state, id);
            // var cloneTask = {...state[index]};
            // cloneTask.status = !cloneTask.status;
            // state[index] = cloneTask;
            state[index] = {
                ...state[index],
                status: !state[index].status
            }
            localStorage.setItem('task', JSON.stringify(state))
            return [...state];
        case types.DELETE_TASK:
            id = action.id
            index = findIndex(state, id);
            state.splice(index, 1);
            localStorage.setItem('task', JSON.stringify(state));
            return [...state];
        default: return state
    }
}

export default myReducer;