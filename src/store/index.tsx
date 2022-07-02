import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counter'
import secretsReducer from './slices/secrets'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        secrets: secretsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch