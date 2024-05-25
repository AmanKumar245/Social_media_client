import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utlis/axiosClient";



 export const getMyInfo = createAsyncThunk('user/getMyInfo', async (_, ) => {

    try {
    
      const response = await axiosClient.get(`/user/getMyInfo`); 
      console.log('profile data my profile',response)

      return response.result;
      
    } catch (error) {
    //console.log("Error in getting user info", error.message);
        return Promise.reject(error);

    } 
});

export const UpdateMyProfile = createAsyncThunk('user/updateMyProfile', async (body)=> {
    
    try {
        
          const response = await axiosClient.put(`/user/`, body); 
          console.log('update my profile',response)
          return response.result;
                  
    
        } catch (error) {
            //console.log("Error in getting user info", error.message);
            return Promise.reject(error);
    
        } 
})
const appConfigSlice = createSlice({
    name: 'appConfigSlice',
    initialState:{
        isLoading: false,
        toastData:{},
        myProfile: {}
    },
    reducers:{
        setLoading:(state, action) =>{
            state.isLoading = action.payload;
        },
       showToast: (state, action)=>{
        state.toastData = action.payload;

       }
    },
    extraReducers: builder => {
        builder.addCase(getMyInfo.fulfilled, (state, action)=>{
        state.myProfile = action.payload.user;
        })
        .addCase(UpdateMyProfile.fulfilled, (state, action)=>{
            state.myProfile = action.payload.user;
            console.log(`updated profile store in my profile `)

        });
    }

})

export default appConfigSlice.reducer;

export const {setLoading,showToast} = appConfigSlice.actions;