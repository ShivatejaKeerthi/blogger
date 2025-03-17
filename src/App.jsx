import { useState,useEffect } from "react";
import './App.css';
import axios from 'axios';

function App(){
  const[posts,setPosts] = useState([]);
  const[loading,setLoading] = useState(true);

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((res)=>{
      setPosts(res.data);
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
    })
    
  },[])

  const filterByUserId = (userId) => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((res)=>{
      setPosts(res.data);
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
    })
  }

  const searchPostsByTitle = (title) => {
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(title.toLowerCase()));
    setPosts(filteredPosts);
  }


  return(
    <div className="App">
      <h1>Welcome to Blogger</h1>
      <h2>Latest Posts</h2>
      
      <div className="filteringDiv">
        <div className="filter">
        <label htmlFor="userId">Filter by User:</label><br/>
      
      <select onChange={(e) => {
        const userId = e.target.value;
        if (userId === "0") {
          axios.get('https://jsonplaceholder.typicode.com/posts')
          .then((res)=>{
            setPosts(res.data);
            setLoading(false);
          })
          .catch((err)=>{
            console.log(err);
            setLoading(false);
          });
        } else {
          filterByUserId(userId);
        }
      }}>
        <option value="0">All Users</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
        <option value="4">User 4</option>
        <option value="5">User 5</option>
        <option value="6">User 6</option>
        <option value="7">User 7</option>
        <option value="8">User 8</option>
        <option value="9">User 9</option>
        <option value="10">User 10</option>
      </select>
        </div>
        <div className="sortbytitle">
        <label htmlFor="sortbytitle">Sort by Title:</label><br/>
        <select onChange={(e) => {
          const sortBy = e.target.value;
          if (sortBy === "0") {
            setPosts([...posts].sort((a, b) => a.title.localeCompare(b.title)));
          } else {
            setPosts([...posts].sort((a, b) => b.title.localeCompare(a.title)));
          }
        }}>
          <option value="0">A-Z</option>
          <option value="1">Z-A</option>
        </select>
        </div>
        <div className="sortbyuserid">
        <label htmlFor="sortbyuserid">Sort by User ID:</label><br/>
        <select onChange={(e) => {
          const sortBy = e.target.value;
          if (sortBy === "0") {
            setPosts([...posts].sort((a, b) => a.userId - b.userId));
          } else {
            setPosts([...posts].sort((a, b) => b.userId - a.userId));
          }
        }}>
          <option value="0">Ascending</option>
          <option value="1">Descending</option>
        </select>
        </div>
        <div className="searchDiv">
        <label htmlFor="search">Search by Title:</label><br/>
        <input type="text" id="search" name="search" onChange={(e) => {
          const title = e.target.value;
          searchPostsByTitle(title);
        }}/>
      </div>
      </div>
      {loading ? (<div className="loader">Loading...</div>) : (
        <div className="posts-container">
          {posts.map((post)=>(
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <p>UserId: {post.userId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App;