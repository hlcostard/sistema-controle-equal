import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import alunoService from "./alunoService"

const initialState = {
  alunos: [],
  isError: false,
  isSucess: false,
  isLoading: false,
  message: "",
}

//cria novo aluno
export const createAluno = createAsyncThunk(
  "alunos/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await alunoService.createAluno(data, token)
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//lista todos alunos
export const getAlunos = createAsyncThunk(
  "alunos/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await alunoService.getAlunos(token)
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//lista 1 aluno
export const getAluno = createAsyncThunk(
  "alunos/getOne",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await alunoService.getAluno(id, token)
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//delete um aluno
export const deleteAluno = createAsyncThunk(
  "alunos/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await alunoService.deleteAluno(id, token)
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//atualiza um aluno
export const updateAluno = createAsyncThunk(
  "alunos/update",
  async (data, thunkAPI) => {
    try {
      const { id, nome, email, telefone, responsavel, preco } = data
      const token = thunkAPI.getState().auth.user.token
      return await alunoService.updateAluno(
        id,
        {
          nome: nome,
          email: email,
          telefone: telefone,
          responsavel: responsavel,
          preco: preco,
        },
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

export const alunoSlice = createSlice({
  name: alunoService,
  initialState,
  reducers: {
    reset: (reset) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAluno.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAluno.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.alunos.push(action.payload)
      })
      .addCase(createAluno.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAlunos.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAlunos.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.alunos = action.payload
      })
      .addCase(getAlunos.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAluno.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAluno.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.alunos = action.payload
      })
      .addCase(getAluno.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteAluno.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAluno.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.isSucess = true
        state.alunos = state.alunos.filter(
          (aluno) => aluno._id !== action.payload._id
        )
      })
      .addCase(deleteAluno.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateAluno.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAluno.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.alunos = state.alunos.map((aluno) =>
          aluno._id === action.payload._id ? action.payload : aluno
        )
      })
      .addCase(updateAluno.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = alunoSlice.actions
export default alunoSlice.reducer
