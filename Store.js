import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commonReducer from "./Src/Redux/Slice/commonSlice"

const reducers = combineReducers({
    commonState:commonReducer
})
const store = configureStore({
    reducer:reducers

})

export default store