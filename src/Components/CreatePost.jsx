import { useContext, useRef } from "react";
import { PostList } from "../Store/posts-list-store";

const CreatePost=()=>{
  const {addPost}=useContext(PostList);

  const userIdElement=useRef();
  const postTitleElement=useRef();
  const postBodyElement=useRef();
  const reactionsElement=useRef();
  const tagsElement=useRef();

  const handleSubmit=(event)=>{
    event.preventDefault();
    const userId=userIdElement.current.value;
    const postTitle=postTitleElement.current.value;
    const postBody=postBodyElement.current.value;
    const reactions=reactionsElement.current.value;
    const tags=tagsElement.current.value.split(" ");

    userIdElement.current.value="";
    postTitleElement.current.value="";
    postBodyElement.current.value="";
    reactionsElement.current.value="";
    tagsElement.current.value="";

    addPost(userId,postTitle,postBody,reactions,tags);
  }

    return(
<form onSubmit={handleSubmit} className="create-post">

  <div className="mb-3">
    <label htmlFor="userId" className="form-label">UserID</label>
    <input ref={userIdElement} type="text" className="form-control" id="userId" placeholder="Enter your user ID"/>
  </div>

  <div className="mb-3">
    <label htmlFor="title" className="form-label">Post Title</label>
    <input ref={postTitleElement} type="text" className="form-control" id="title" placeholder="Give your post a title."/>
  </div>

  <div className="mb-3">
    <label htmlFor="body" className="form-label">Post Content</label>
    <textarea ref ={postBodyElement}rows="3" type="text" className="form-control" id="body" placeholder="Tell us more about it."/>
  </div>

  <div className="mb-3">
    <label htmlFor="reactions" className="form-label">Number of Reactions</label>
    <input ref={reactionsElement} className="form-control" id="reactions" placeholder="How many people reacted to your post"/>
  </div>

  <div className="mb-3">
    <label htmlFor="tags" className="form-label">Tags</label>
    <input ref={tagsElement} type="text" className="form-control" id="tags" 
    placeholder="Please enter tags using spaces"/>
  </div>

 
  <button type="submit" className="btn btn-primary">Post</button>
</form>
    );
}
export default CreatePost;