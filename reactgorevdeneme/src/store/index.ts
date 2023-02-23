import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import todoSlice from "../features/todoSlice";

const store = configureStore ({
    reducer: {
        todos: todoSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type  AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector