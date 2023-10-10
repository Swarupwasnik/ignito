
import React, {
  useRef,
  useState,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { Avatar } from "@material-tailwind/react";
import eno from "../assets/Images/eno.jpg";
import { Button,Alert,PostCard } from "@material-tailwind/react";
import smile2 from "../assets/Images/smile2.gif";
import live1 from "../assets/Images/live1.png";
import add from "../assets/Images/add.png";
import { AuthContext } from "../context/WebContext";
import { db } from "../firebase/firebase";
import {
  collection,
  setDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import {
  PostActions,
  PostsReducer,
  postReducer,
  postsStates,
} from "../context/PostReducer";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Main = () => {
  const { user, userData } = useContext(AuthContext);
  const text = useRef("");
  const scrollRef = useRef("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = PostActions;
  const [progressBar, setProgressBar] = useState(0);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitPost = async (e) => {
    if (text.current.value !== "") {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.PhotoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text.current.value,
          image: image,
          timestamp: serverTimestamp(),
        });
        test.current.value = "";
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  const storage = getStorage();

  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };
  const submitImage = async () => {
    const fileType = metadata.contentType.includes(file["type"]);
    console.log(file, "file");
    if (fileType) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          file,
          metadata.contentType
        );

        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progress); // Update the progress bar
          },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setImage(downloadURL);
              }
            );
          }
        );
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      await onSnapshot(q, (snapshot) => {
        const postsData = snapshot.docs.map((doc) => doc.data());
        dispatch({
          type: SUBMIT_POST,
          posts: postsData,
        });
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        setFile(null);
        setProgressBar(0);
      });
    };
    postData();
  }, [SUBMIT_POST]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col py-4  w-full rounded-3xl shadow-lg">
        <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
          <Avatar
            src={user?.PhotoURL || eno }
            size="sm"
            alt="avatar"
            variant="circular"
          ></Avatar>

          <form className="w-full" onSubmit={handleSubmitPost}>
            <div className="flex justify-between items-center">
              <div className="w-full ml-4">
                <input
                  className="outline-none w-full bg-white rounded-md"
                  name="text"
                  type="text"
                  ref={text}
                  placeholder={`Share your Feeling ${
                    user?.displayName?.split("")[0] || // Fix the typo here
                    userData?.name?.charAt(0).toUpperCase() +
                      userData?.name?.slice(1)
                  }`}
                />
              </div>

              <div className="mx-4">
                {image && (
                  <img
                    className="h-24 rounded-xl"
                    src={image}
                    alt="preview"
                  ></img>
                )}
              </div>
              <div className="mx-4"></div>
              <div className="mr-4">
                <Button variant="text" type="submit">
                  Share
                </Button>
              </div>
            </div>
          </form>
        </div>
        <span
          className="bg-blue-700 py-1 rounded-md"
          style={{ width: `${progressBar}%` }}
        >
          {/* {progressBar} */}
        </span>
        <div className="flex justify-around items-center pt-4 ">
          <div className="flex items-center">
            <label
              htmlFor="addImage"
              className="cursor-pointer flex items-center"
            >
              <img className="h-10 mr-4" src={add} alt="iamge" />
              <input
                style={{ display: "none" }}
                id="addImage"
                type="file"
                onChange={handleUpload}
              />
            </label>
            {file && (
              <Button variant="text" onClick={submitImage}>
                Upload
              </Button>
            )}
            {/* <button variant="" > */}
            {/* Upload
</button> */}
          </div>
          <div className="flex items-center">
            <img className="h-10 m-4" src={live1} alt="feeling" />
            <p className="font-roboto font-Open_Sans font-medium  text-md text-gray-700 no-underline tracking-normal leading-none">
              Live
            </p>
          </div>

          <div className="flex items-center">
            <img className="h-10 m-4" src={smile2} alt="feeling" />
            <p className=" font-Open_Sans font-medium  text-md text-gray-700 no-underline tracking-normal leading-none">
              Feeling
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 w-full">
        {state.error ? (
          <div className="flex justify-center items-center">
            <Alert color="red">Something went wrong.</Alert>
          </div>
        ) : (
          <div>
            {state.posts && state.posts.length > 0 &&
              state.posts.map((post, index) => {
                return (
                  <PostCard
                    name={post.name}
                    email={post.email}
                    timestamp={
                      new Date(post?.timestamp?.toDate()?.toUTCString())
                    }
                    image={post.image}
                    uid={post?.uid}
                    key={index}
                    logo={post.logo}
                    id={post.documentId}
                  ></PostCard>
                );
              })}
          </div>
        )}
      </div>

      <div ref={scrollRef}>{/* refer for letter */}</div>
    </div>
  );
};

export default Main;