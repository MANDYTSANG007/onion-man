import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: "", message: "", selectedFile: "" });
    //create a dispatch action
    const dispatch = useDispatch();
    const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    // Create submit button logic
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.userObject?.name }));
            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.userObject?.name }));
            clear();
        }
    };

    // Create clear button logic
    const clear = () => {
        setCurrentId(0);
        setPostData({ title: "", message: "", selectedFile: "" })
    };

    if(!user?.userObject?.name) {
        return (
            <Paper sx={{marginTop: "5%"}}>
                <Typography variant="h6" align="center">
                    Please sign in to add your onion recipes and like other's recipes. For simplicity reasons,
                    this site includes only dish's ingredients. Feel free to use your imagination for
                    cooking instructions. 
                </Typography>
            </Paper>
        )
    };

    return (
        <Paper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography sx={{marginTop: "5%", padding: "5%"}} align="center" variant="h6"> {currentId ? 'Editing a Recipe' : 'Creating a Recipe' } </Typography>
            
                <TextField
                    sx={{ mt: 1, mb: 2}}
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField
                    sx={{ mt: 1, mb: 2}}
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <div>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button sx={{ mt: 2, mb: 2}} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button sx={{ mt: 2, mb: 2}} variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;