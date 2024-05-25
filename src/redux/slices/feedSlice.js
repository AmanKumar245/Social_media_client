import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utlis/axiosClient";
import { likeAndUnlikePost } from "./PostSlice";


 
 export const getFeedData = createAsyncThunk(`user/getFeedData`, async(_,)=>{
try {
    const response = await axiosClient.get(`/user/getFeedData `,
        
    );
    console.log('Get Feed Data', response.result);
    return response.result;

    
} catch (error) {
    return Promise.reject(error)
}
});

export const followAndUnfollowUser = createAsyncThunk(
    'user/followAndUnfollow',
     async (body) => {
        try {
            const response = await axiosClient.post('/user/follow',body)
            console.log('follow and unfollow Api',response);

            return response.result.user;
            
        } catch (error) {
            return Promise.reject(error)

        }

})
    
const FeedSlice = createSlice({
    name: 'FeedSlice',
    initialState:{
       feedData:{
        posts: [],
        followings: [],
        suggestions: []
       }
    },
   
    
    extraReducers: (builder) => {
        builder.addCase(getFeedData.fulfilled, (state, action)=>{
        state.feedData = action.payload;
        })
        .addCase(likeAndUnlikePost.fulfilled, (state, action)=>{
            const updatedPost = action.payload;
            console.log('like Post', updatedPost);
            const index = state.feedData.posts.findIndex(item => item._id === updatedPost._id);
            if( index !== -1 ){
                state.feedData.posts[index]= updatedPost;
                
            }
        })
        .addCase(followAndUnfollowUser.fulfilled,(state, action) => {
            const user = action.payload;
            const index = state?.feedData.followings.findIndex(item => item._id === user._id);
            if(index !== undefined && index !== -1){
                state.feedData.followings.splice(index,1);
            }else{
                state.feedData.followings.push(user);

            }


        })
        
    }

})

export default FeedSlice.reducer;

