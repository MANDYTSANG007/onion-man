import React from 'react';
import Post from './Post/Post';
import { useSelector } from 'react-redux';


const Posts = () => {
    const posts = useSelector((state) => state.posts);

    console.log(posts);

    return (
        <React.Fragment>
            <h1>POSTS</h1>
            <Post/>
            <Post/>
        </React.Fragment>
    );
};

export default Posts;