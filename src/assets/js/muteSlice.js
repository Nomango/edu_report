import { createSlice } from '@reduxjs/toolkit'

export const muteSlice = createSlice({
    name: 'config',
    initialState: {
        value: false,
    },
    reducers: {
        toggleMuted: (state) => {
            state.value = !state.value;
        },
    },
})

// Action creators are generated for each case reducer function
export const { toggleMuted } = muteSlice.actions

export default muteSlice.reducer
