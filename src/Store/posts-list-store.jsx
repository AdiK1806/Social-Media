import { createContext, useReducer,useState,useEffect } from "react";


export const PostList=createContext({
    postList:[],
    addPost:()=>{},
    deletePost:()=>{},
    fetching:false
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
    }else if(action.type=='ADD_INITIAL_POSTS'){
        newPostList=action.payload.posts;
    }
    return newPostList;
}





//Component
function PostListProvider({children}){


    const addInitialPosts=(posts)=>{
        dispatchPostList({
            type:'ADD_INITIAL_POSTS',
            payload:{
                posts
            }
        })
    }
const[fetching,setFetching]=useState(false);

useEffect(()=>{
    
    setFetching(true);
    const controller=new AbortController();
    const signal=controller.signal;

    fetch("https://dummyjson.com/posts",{signal}).then((res)=>res.json()).then((data)=>{
    addInitialPosts(data.posts);
    setFetching(false);
        });

    return ()=>{
        controller.abort();
        }

    },[]);



    const addPost=(post)=>{
        dispatchPostList({
            type:'ADD_POST',
            payload:post  
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
        deletePost:deletePost,
        fetching:fetching
    }}>

        {children}
    </PostList.Provider>

}

const DEFAULT_POST_LIST=[

]
    
export default PostListProvider;