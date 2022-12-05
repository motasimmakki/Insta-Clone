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


  // ***Intersection Observer Code.
  let options = {
      threshold: 0.6
  }

  const callback = (entries) => {
      entries.forEach((entry) => {
        let element = entry.target.childNodes[0];
          // console.log(element);
          // console.log(element.tagName.toLowerCase());
          if(element.tagName.toLowerCase() !== 'video') return;
          element.play().then(() => {
            if(!element.paused && !entry.isIntersecting) {
              element.pause();
            }
          });
      });
  }

  let observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    const elements = document.querySelectorAll(".videos-cont");
    // console.log("Elements: ", elements);
    let postContainer = elements[0].childNodes;
    postContainer.forEach((video) => {
      // console.log(video.childNodes[0]); // Video Element/ Video Tag.
      observer.observe(video);
    });
    return () => {
      observer.disconnect();
    }
  }, [posts]);

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
