import React from 'react';
import { Card, Typography, CardMedia, Button, CardContent, CardActions } from '@mui/material';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';


const Post = ({ post, setCurrentId }) => {

    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.userObject?.googleId || user?.userObject?._id))
                ? (
                    <React.Fragment>
                        <ThumbUpAltIcon fontSize="small" /> &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ""}`}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <ThumbUpAltIcon fontSize="small" /> &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
                    </React.Fragment>
                )
        }
        return (
            <React.Fragment>
                <ThumbUpAltIcon fontSize="small" /> &nbsp;Like
            </React.Fragment>
        )
    };

    return (
        <Card>
            <CardMedia image={post.selectedFile} title={post.selectedFile} >
                <div>
                    <Typography variant="h6" color="white"> {post.creator} </Typography>
                    <Typography variant="body2" color="white"> {moment(post.createdAt).fromNow()} </Typography>
                </div>
                <div>
                    <Button style={{ color: "white" }} size="large" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
                <Typography gutterBottom variant="h5" component="h2">{post.title}</Typography>

                <CardContent>
                    <Typography variant="body2" color="white" component="p">{post.message}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" disabled={!user?.userObject} onClick={() => dispatch(likePost(post._id))}  >
                        <Likes />
                    </Button>
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />Delete
                    </Button>
                </CardActions>
            </CardMedia>
        </Card>
    );
};

export default Post;