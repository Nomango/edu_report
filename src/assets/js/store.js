import { configureStore } from '@reduxjs/toolkit'
import muteSlice from './muteSlice'

export default configureStore({
    reducer: {
        mute: muteSlice,
    },
})