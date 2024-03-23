import Post from "./Post";
import { useContext} from "react";
import { PostList as  PostListData} from "../Store/posts-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";
LoadingSpinner

const PostList=()=>{

    const {postList,fetching}=useContext(PostListData);


return <>
   {fetching && <LoadingSpinner/>}
        {(!fetching&&postList.length===0 && <WelcomeMessage/>)}

        {!fetching&&postList.map((post)=>{
            return <Post key={post.id} post={post}/>
        })}
    </>
}
export default PostList;