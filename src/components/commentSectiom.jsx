import React, { useContext, useRef, useReducer } from "react";
import { Avatar } from "@material-tailwind/react";
import avatar from "../assets/Images/cry.jpg";
import { AuthContext } from "../context/WebContext";
// import { comment } from "postcss";
import { collection,setDoc,doc,serverTimestamp, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { PostsReducer, PostActions, postsStates } from "../context/PostReducer";
import Comment from "./Comment";
const CommentSection = ({ postId }) => {
    const { user, userData } = useContext(AuthContext);
    const comment = useRef("");
    const commentRef = doc(collection(db, 'postid', 'CommentSection'));
    const [state, dispatch] = useReducer(PostsReducer, postsStates);
    const { ADD_COMMENT, HANDLE_ERROR } = PostActions;

    const addComment = async (e) => {
        if (comment.current.value !== "") {
            try {
                await setDoc(commentRef, {
                    id: commentRef.id,
                    comment: comment.current, value,
                    image: user?.photoURL,
                    name: user?.displayName?.spilt(" ")[0] || userData?.name?.chartAt(0)?.toUpperCase() + userData?.name?.slice(1),
timestamp:serverTimestamp(),



                })

                comment.current.value == "";

            } catch (err) {
                dispatch({type:HANDLE_ERROR});
                alert(err.message);
                console.log(err.message);
            }
        }
    }

    useEffect(()=>{
        const getComments=async()=>{
            try{
const collectionOfComments=collecetion(db,`posts${postid}/CommentSection`);
const q=query(collectionOfComments,orderBy("timestamp","desc"));
await onSnapshot(q,(doc)=>{
    dispatch({type:ADD_COMMENT,CommentSection:doc.docs[0].map((item)=>
item.data()

    )

    })
})
            }catch(err){
                dispatch({type:HANDLE_ERROR});
                alert(err.message);
                console.log(err.message);
            }
        };
        return()=>getComments();

    },[postId,ADD_COMMENT,HANDLE_ERROR]);
    return (
        <div className="flex  flec-col bg-white w-full py-2 rounded-b-3xl ">
            <div className="flex items-center">
                <div>
                    <Avatar variant="circular" src={user?.photoURL || avatar}></Avatar>
                </div>
                <div className="w-full pr-2">
                    <form onSubmit={ addComment} className="flex items-center w-full ">
                        <input
                            placeholder="write a comment..."
                            ref={comment}
                            type="text"
                            className="w-full rounded-2xl ouline-none border-0 p-2 bg-white"
                            name="comment"
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
{state.comments?.map((comment,index)=>{
    return <Comment name={comment.name} image={comment.image} comment={comment.comment} key={index}></Comment>
})}
        </div>
    );
};

export default CommentSection;
