import { RootState } from '../../app/store'
import { createSlice } from '@reduxjs/toolkit'

export type Permissions = "admin" | "jobSeeker" | "company"

// type of user state information
export type User = {
    id: number | null,
    username: string | null,
    permission: Permissions | null,
    token: string | null | any
}
// intial State when the app starts
let intiState: User = {
    id: null,
    username: null,
    permission: "company",
    token: true
}
// get localstoragestate
if (localStorage.getItem('auth') !== null) {
    intiState = { ...JSON.parse(localStorage.getItem('auth') || '{}') as User }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: intiState,
    reducers: {
        setCredentials: (state, action) => {
            console.log(action.payload)
            const { id, username, token, permission, companyName } = action.payload
            const user = { id, username, token, permission }
            localStorage.setItem('auth', JSON.stringify(user))
            state.id = id;
            state.username = username || companyName;
            state.permission = permission;
            state.token = token
        },
        logOut: (state) => {
            localStorage.removeItem('auth')
            state.id = null
            state.username = null
            state.permission = null
            state.token = null
        },
    }
})


export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer


//getters
export const selectCurrentId = (state: RootState) => state.auth.id
export const selectCurrentUserName = (state: RootState) => state.auth.username
export const selectCurrentPermission = (state: RootState) => state.auth.permission
export const selectCurrentToken = (state: RootState) => state.auth.token