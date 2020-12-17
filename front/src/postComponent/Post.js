import './Post.scss';
import {useHistory, useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import { AppContext } from '../appContext';
import config from '../config';
import DeleteIcon from '@material-ui/icons/Delete';
import PollIcon from '@material-ui/icons/Poll';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles({
    btnRoot: {
        'margin-right': '12px'
    },
    cardRoot: {
        'margin': '24px'
    },
    linkRoot: {
        'cursor': 'pointer'
    },
    loaderRoot: {
        'display': 'flex',
        'justify-content': 'center'
    },
    pollOption: {
        'display': 'block',
        'width': '100%',
        'text-align': 'left'
    },
    avatarRoot: {
        'text-decoration': 'none',
        'cursor': 'pointer'
    }
});

function Post(props) {
    const { t } = useTranslation();
    const url = config.API_URL;
    const styles = useStyles();
    const history = useHistory();
    const [post, setPost] = useState({});
    const [vote, setVote] = useState(null);
    const [groupUser, setGroupUser] = useState({});
    const [update, initiateUpdate] = useState({});
    const context = useContext(AppContext);
    const { groupId, postId } = useParams();

    const handleVote = async (option) => {
        try {
            const response = await fetch(`${url}/groups/${groupId}/posts/${postId}/vote`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Authorization": `Bearer ${context.token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    option: option
                })
            });

            const data = await response.json();

            if (response.ok) {
                initiateUpdate({});
            }
            else {
                console.log(data.message);
            }
        }
        catch(error) {
            console.log(error)
        }
    } 

    const handleRevert = async () => {
        try {
            const response = await fetch(`${url}/groups/${groupId}/posts/${postId}/vote`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    "Authorization": `Bearer ${context.token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                initiateUpdate({});
            }
            else {
                console.log(data.message);
            }
        }
        catch(error) {
            console.log(error)
        }
    } 

    const handleApprove = async () => {
        try {
            const response = await fetch(`${url}/groups/${groupId}/posts/${postId}`, {
                method: 'PATCH',
                mode: 'cors',
                headers: {
                    "Authorization": `Bearer ${context.token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                history.push(`/groups/${groupId}`);
            }
            else {
                console.log(data.message);
            }
        }
        catch(error) {
            console.log(error)
        }
    } 

    const handleDelete = async () => {
        try {
            const response = await fetch(`${url}/groups/${groupId}/posts/${postId}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    "Authorization": `Bearer ${context.token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                history.push(`/groups/${groupId}`);
            }
            else {
                console.log(data.message);
            }
        }
        catch(error) {
            console.log(error)
        }
    } 

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${url}/groups/${groupId}/users/me`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${context.token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    const user = data.user;
                    setGroupUser(user);
                }
                else {
                    console.log(data.message);
                }
            }
            catch(error) {
                console.log(error)
            }
        }

        getUser();
    }, [url, context, groupId]);

    useEffect(() => {
        const getGroups = async () => {
            try {
                const response = await fetch(`${url}/groups/${groupId}/posts/${postId}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${context.token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setPost(data.post);
                }
                else {
                    console.log(data.message);
                }
            }
            catch(error) {
                console.log(error)
            }
        }

        getGroups();
    }, [url, context, groupId, postId, update]);

    useEffect(() => {
        const getVote = async () => {
            try {
                const response = await fetch(`${url}/groups/${groupId}/posts/${postId}/vote`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${context.token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setVote(data.vote);
                }
                else {
                    console.log(data.message);
                }
            }
            catch(error) {
                console.log(error)
            }
        }

        getVote();
    }, [url, context, groupId, postId, update]);

    return (
        <Card classes={{root: styles.cardRoot}}>
            {
                post.creator ? (
                    <>
                        <CardHeader
                            avatar={<Link
                                    underline="none"
                                    classes={{root: styles.avatarRoot}}
                                    title={post.creator.fullname}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        history.push(`/groups/${post.group._id}/users/${post.creator._id}`);
                                    }}
                                >
                                    <Avatar aria-label="creator">
                                        {post.creator.fullname.slice(0, 1) || null}
                                    </Avatar>
                                </Link>
                            }
                            title={post.title}
                            subheader={(new Date(post.created_date)).toLocaleDateString(context.lang)}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body2" component="p">
                                {post.content}
                            </Typography>
                            {post.is_poll ? post.options.map(option => (
                                <Button 
                                    key={option._id}
                                    variant="text"
                                    fullWidth
                                    classes={{root: styles.pollOption}}
                                    disabled={vote ? true : false}
                                    onClick={() => handleVote(option.name)}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body2">
                                            {option.name}
                                        </Typography>
                                        {vote && vote.option === option.name ? <CheckCircleIcon /> : ''}
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        <Box width="100%" mr={1}>
                                            <LinearProgress variant="determinate" value={option.votes && (option.votes / option.total * 100)} />
                                        </Box>
                                        <Box minWidth={35}>
                                            <Typography variant="body2" color="textSecondary">{`${Math.round(
                                                option.votes && (option.votes / option.total * 100)
                                            )}%`}</Typography>
                                        </Box>
                                    </Box>
                                </Button>
                            )) : ''}                              
                        </CardContent>
                        <CardActions>
                            {
                                !post.confirmed && groupUser.is_admin ? (
                                    <Box>
                                        <Button
                                            startIcon={<CheckCircleIcon />}
                                            variant="text"
                                            color="primary"
                                            onClick={handleApprove}
                                        >   
                                            {t('action.approve')}
                                        </Button>
                                    </Box>) : ''
                            }
                            {
                                post.creator._id === groupUser.user._id || groupUser.is_admin ? (
                                    <Box>
                                        <Button
                                            startIcon={<DeleteIcon />}
                                            variant="text"
                                            color="secondary"
                                            onClick={handleDelete}
                                        >   
                                            {t('action.delete')}
                                        </Button>
                                    </Box>
                                ) : ''
                            }
                            {
                                post.is_poll && vote ? (
                                    <Box>
                                        <Button
                                            startIcon={<PollIcon />}
                                            variant="text"
                                            color="primary"
                                            onClick={handleRevert}
                                        >   
                                            {t('action.revertVote')}
                                        </Button>
                                    </Box>) : ''
                            }
                        </CardActions>
                    </>
                ) : (
                    <CardContent classes={{root: styles.loaderRoot}} >
                        <CircularProgress/>                        
                    </CardContent>
                )
            }
        </Card>
    );
}

export default Post;