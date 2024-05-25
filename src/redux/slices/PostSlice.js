import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utlis/axiosClient";


 export const getUserProfile = createAsyncThunk('user/getUserProfile', async (body) => {

    try {
    
      const response = await axiosClient.post(`/user/getUserProfile`,body); 
      console.log('get user PRofile',response);
      return response.result;
      
    } catch (error) {
    //console.log("Error in getting user info", error.message);
        return Promise.reject(error);

    }
});

 export const likeAndUnlikePost = createAsyncThunk(`post/likeAndUnlike`, async(body)=>{
try {
    const response = await axiosClient.post(`/posts/like `,
        body
    );
    console.log('post like from Api endpoint', response);
    return response.result.post;

    
} catch (error) {
    return Promise.reject(error)
}
 })  
    
const PostSlice = createSlice({
    name: 'PostSlice',
    initialState:{
        userProfile:{
            avatar: {},
            _id: '',
            name: '',
            email: '',
            password: '',
            followers: [],
            followings: [],
            posts: [],
            createdAt: '',
            updatedAt: ''
        }
    },
   
    
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action)=>{
        state.userProfile = action.payload;
        })
        .addCase(likeAndUnlikePost.fulfilled, (state, action)=>{
            const updatedPost = action.payload;
            console.log('like Post', updatedPost);
            const index = state?.userProfile?.posts?.findIndex(item => item._id === updatedPost._id);
            if(index && index !== -1 ){
                state.userProfile.posts[index]= updatedPost;
                
            }
        })
        
    }

})

export default PostSlice.reducer;

