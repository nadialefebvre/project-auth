import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userId: null,
  username: null,
  accessToken: null,
  error: null
}

const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
    logOut: () => {
      return initialState
    }
  }
})

export default user
