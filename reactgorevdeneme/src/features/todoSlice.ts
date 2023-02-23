import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 } from "uuid";

export interface Todo {
    id: string;
    title: string;
    title2: string;
    completed: boolean;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<string>) => {
            const newTodo = { id: v4(), title: action.payload, completed: false, title2: action.payload };
            state.push(newTodo);
        },
        add2: (state, action: PayloadAction<string>) => {
            const newTodo = { id: v4(), title: action.payload, completed: false, title2: action.payload };
            state.push(newTodo);
        },
        remove: (state, action: PayloadAction<string>) => {
            return state.filter(todo => todo.id !== action.payload);
        }
    }
})

export default todoSlice.reducer;
export const { add, add2, remove } = todoSlice.actions;