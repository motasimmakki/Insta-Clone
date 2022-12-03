import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth'
import { db } from '../firebase';
import Navbar from './Navbar'
import Upload from './Upload'
import Post from './Post'

export default function Feeds() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    // console.log("User Data: ", user);
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      // console.log("doc: ", doc.data());
      setUserData(doc.data());
    });
    return () => unsub();
  }, [user]);
  
  // Getting posts from db.
  // work as: Component Did Mount (CDM).
  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "posts"), orderBy("timeStamp", "desc")),
    (snapshot) => {
      let tempArray = [];
      snapshot.docs.map(doc => tempArray.push(doc.data()));
      setPosts([...tempArray]);
    }
    );
    return () => unsub();
  }, []);

  return (
    <div className='feed-cont'>
        <Navbar userData={ userData }/>
        <Upload userData={ userData }/>
        <div className='videos-cont'>
          {posts.map((post) => <Post key={post.postId} postData={post} userData={userData}/>)}
        </div>
    </div>
  )
}
