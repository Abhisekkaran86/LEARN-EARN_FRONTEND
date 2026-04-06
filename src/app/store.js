// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/authSlice";


// export const store = configureStore({
//     reducer:{
//         auth: authReducer,
//     }
// });

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import contestReducer from "../features/contestSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contest: contestReducer,
  },
});