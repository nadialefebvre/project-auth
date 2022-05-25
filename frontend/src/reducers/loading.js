import { createSlice } from '@reduxjs/toolkit'

const loading = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false
  },
  reducers: {
    setLoading: (store, action) => {
      store.isLoading = action.payload
    }
  }
})

export default loading
