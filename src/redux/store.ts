import { combineReducers, configureStore } from "@reduxjs/toolkit";


interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
}

interface Action {
    type: string;
    payload: any;
}

const initialState: Task[] = [{ id:1, title: "initial task", isCompleted:false}];

export const getTasks = (store: any) => store.taskList;
export const getCompletedTasks = (store: any) => store.taskList.filter((task:any) => task.isCompleted==true);

const ADD_TASK = "ADD_TASK";
export function addTask(title:string){
    return {
        type : ADD_TASK,
        payload : {
            title
        }
    }
}

const TOGGLE_TASK = "TOGGLE_TASK";

export const toggleTask = (id:number) =>({
    type : TOGGLE_TASK,
    payload : {id}
});


const DELETE_TASK = "DELETE_TASK";

export const deleteTask = (id : number) => ({
    type : DELETE_TASK,
    payload : {id}
});


const taskList = (state = initialState, action: Action ) =>{
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, {
                id: new Date().getTime(),
                title: action.payload.title,
                isCompleted: false,
            }];
        case 'TOGGLE_TASK':
            let newState: Array<Task>  = [];
            
            state.forEach(task=>{
                if(task.id === action.payload.id){
                    newState.push({
                        ...task,
                        isCompleted: !task.isCompleted,
                    });
                    return;
                }
                newState.push(task);
            });
            return newState;
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload.id);

        default:
            return state;
    }
}
  
export const store = configureStore({
    reducer: combineReducers({
        taskList,
    }),
    devTools:true,
});