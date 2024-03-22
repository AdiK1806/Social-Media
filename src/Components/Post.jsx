import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostList } from "../Store/posts-list-store";

const Post=({post})=>{
    const {deletePost}=useContext(PostList)

    return(
        <div className="card post-card">
        <div className="card-body">
            <h4 className="card-title">{post.title}
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onClick={()=>
                deletePost(post.id)}>
            <MdDelete/>
  </span>
            </h4>

            <p className="card-text">{post.body}</p>
            {post.tags.map((tag)=>{
                return <span key={tag} className="badge  text-bg-primary hashtag">#{tag}</span>
            })}
<div className="alert alert-success reactions" role="alert">
  This post has <span className="reaction-cnt">{post.reactions}</span> reactions.
</div>
        </div>
        </div>
    );
}
export default Post;