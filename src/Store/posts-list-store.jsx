import { createContext, useReducer } from "react";


export const PostList=createContext({
    postList:[],
    addPost:()=>{},
    deletePost:()=>{}
});

const postListReducer=(currPostList,action)=>{
    let newPostList=currPostList;

    if(action.type==='DELETE_POST'){
        newPostList=currPostList.filter(function(post){
            return post.id!==action.payload.postId;
        })
    }else if(action.type=='ADD_POST'){
        newPostList=[action.payload,...currPostList]
        alert("Posted!")
    }
    return newPostList;
}


function PostListProvider({children}){

    const addPost=(userId,postTitle,postBody,reactions,tags)=>{
        dispatchPostList({
            type:'ADD_POST',
            payload:{
                id: Date.now(),
                userId:userId,
                title:postTitle,
                body:postBody,
                reactions:reactions,
                tags:tags
            }
        })
    }
    const deletePost=(postId)=>{
        dispatchPostList({
            type: 'DELETE_POST',
            payload:{
                postId
            }
        });
    }
    
    const [postList,dispatchPostList]=useReducer(postListReducer,DEFAULT_POST_LIST);



    return <PostList.Provider value={{
        postList: postList,
        addPost:addPost,
        deletePost:deletePost
    }}>

        {children}
    </PostList.Provider>

}

const DEFAULT_POST_LIST=[
    {
        id:'1',
        title:'Going to Mumbai',
        body:"Hi guys, I'm be going to Mumbai on 24th March. If anyone is up for a meetup DM me. Hope to see you at Juhu",
        reactions:2,
        userId:'',
        tags:['vacation','Mumbai','Enjoying']
    },
    {
        id:'2',
        title:'BTech Done',
        body:"Greetings connections!                             I've finally completed my B.Tech. and it's been a hell of a ride but totally worth it.",
        reactions:9,
        userId:'',
        tags:['graduating','unbelievable',]
    }
]
export default PostListProvider;