import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import aulasService from "./aulasService"

const initialState = {
  aulas: [],
  isError: false,
  isSucess: false,
  isLoading: false,
  message: "",
}

//cria novo aula
export const createAula = createAsyncThunk(
  "aulas/create",
  async (dados, thunkAPI) => {
    try {
      const { alunoId, tema, horas, data, observacoes, pago } = dados
      const token = thunkAPI.getState().auth.user.token
      return await aulasService.createAula(
        alunoId,
        { tema, horas, data, observacoes, pago },
        token
      )
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//lista todos aula
export const getAulas = createAsyncThunk(
  "aulas/getAll",
  async (alunoId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await aulasService.getAulas(alunoId, token)
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//delete uma aula
export const deleteAula = createAsyncThunk(
  "aulas/delete",
  async (dados, thunkAPI) => {
    try {
      const { alunoId, _id } = dados
      const token = thunkAPI.getState().auth.user.token
      return await aulasService.deleteAula(alunoId, _id, token)
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//atualiza uma aula
export const updateAula = createAsyncThunk(
  "aulas/update",
  async (dados, thunkAPI) => {
    try {
      const { alunoId, _id, tema, horas, data, observacoes, pago } = dados
      const token = thunkAPI.getState().auth.user.token
      return await aulasService.updateAula(
        alunoId,
        _id,
        { tema, horas, data, observacoes, pago },
        token
      )
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const aulaSlice = createSlice({
  name: aulasService,
  initialState,
  reducers: {
    reset: (reset) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAula.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAula.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.aulas.push(action.payload)
      })
      .addCase(createAula.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAulas.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAulas.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.aulas = action.payload
      })
      .addCase(getAulas.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteAula.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAula.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.aulas = state.aulas.filter(
          (aula) => aula._id !== action.payload._id
        )
      })
      .addCase(deleteAula.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateAula.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAula.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.aulas = state.aulas.map((aula) =>
          aula._id === action.payload._id ? action.payload : aula
        )
      })
      .addCase(updateAula.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = aulaSlice.actions
export default aulaSlice.reducer
