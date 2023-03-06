import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    inputs: [],
    error: '',
    formInputs: {},
    disabled: false
}

export const fetchInputs = createAsyncThunk('form/fetchInputs', (state) => {

    let url = 'https://run.mocky.io/v3/a55c4590-c635-49af-a01f-7ee2e6a85669'
    url = 'https://run.mocky.io/v3/7ec8da10-b0ee-4016-86a0-100925968a0c'

    return axios
        .get(url)
        .then(response => response.data)

})

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        handleInputChange: (state, action) => {
            const { key, val } = action.payload;
            state.formInputs[key] = val;
            state.disabled = state.formInputs[key] ? false : true
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchInputs.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchInputs.fulfilled, (state, action) => {
            state.loading = false
            state.inputs = action.payload
            state.error = ''
            action.payload.forEach((val, index) => {
                state.formInputs[val.id] = val.defaultVal
            })
        })
        builder.addCase(fetchInputs.rejected, (state, action) => {
            state.loading = false
            state.inputs = []
            state.error = action.error.message
        })
    }
})

export const { handleInputChange } = formSlice.actions;
export default formSlice.reducer