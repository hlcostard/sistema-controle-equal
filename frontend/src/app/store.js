import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import alunoReducer from "../features/alunos/alunoSlice"
import aulaReducer from "../features/aulas/aulasSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alunos: alunoReducer,
    aulas: aulaReducer,
  },
})
