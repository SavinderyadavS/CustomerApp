// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uid: null,
    userData: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserID(state, action) {
            state.uid = action.payload;
        },
        setUserData(state, action) {
            state.userData = action.payload;
        },
        clearUser(state) {
            state.uid = null;
            state.userData = null;
        }
    }
});

export const { setUserID, setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;
