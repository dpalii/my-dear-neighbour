import './Posts.scss';
import { Link as RouterLink, BrowserRouter as Router } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { AppContext } from '../appContext';
import config from '../config';
import PollIcon from '@material-ui/icons/Poll';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    btnRoot: {
        'margin-right': '12px'
    },
    cardRoot: {
        'margin-bottom': '24px'
    }
});

function Posts(props) {
    const id = props.id;
    const url = config.API_URL;
    const context = useContext(AppContext);
    const styles = useStyles();
    const [posts, setPosts] = useState([]);
    const [groupUser, setGroupUser] = useState({});
    const [update, initiateUpdate] = useState({});
    const [unapproved, setUnapproved] = useState(false);
    
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${url}/groups/${id}/users/me`, {
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
    }, [url, context, id]);

    useEffect(() => {
        const getGroups = async () => {
            try {
                const response = await fetch(`${url}/groups/${id}/posts?unapproved=${unapproved && groupUser.is_admin}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${context.token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    const postList = data.posts;
                    setPosts(postList);
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
    }, [url, context, update, id, unapproved, groupUser]);

    return (
        <Router>
            <div className="post-list-controls">
                {
                    groupUser && groupUser.is_admin ? (
                        <Button 
                            classes={{root: styles.btnRoot}}
                            display="block"
                            variant="contained"
                            startIcon={<CheckCircleIcon />}
                            onClick={() => setUnapproved(!unapproved)}
                        >
                            {!unapproved ? "Unapproved posts" : "Approved posts"}
                        </Button>
                    ) : ''
                }
                {
                    !unapproved || groupUser.is_admin ? (
                        <Button
                            display="block"
                            variant="contained"
                            startIcon={<AddIcon />}
                        >
                            Create post
                        </Button>
                    ) : ''
                }
                <div className="filler"></div>
                <IconButton 
                    classes={{root: "refresh-btn"}}
                    color="primary" 
                    aria-label="upload picture" 
                    component="span"
                    onClick={() => initiateUpdate({})}
                >
                    <RefreshIcon />
                </IconButton>
            </div>
            <div className="post-list">
                {
                    posts.length > 0 ?
                    posts.map(post => (
                        <Card classes={{root: styles.cardRoot}} key={post._id}>
                            <CardHeader
                                avatar={<RouterLink className="avatar-link" to={`/groups/${post.group._id}/users/${post.creator._id}`}>
                                    <Avatar aria-label="creator">
                                        {post.creator.fullname.slice(0, 1) || null}
                                    </Avatar>
                                </RouterLink>
                                }
                                title={<RouterLink to={`/groups/${post.group._id}/posts/${post._id}`}>
                                        {post.title}
                                    </RouterLink>}
                                subheader={(new Date(post.created_date)).toLocaleDateString(context.lang)}
                            />
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    {post.content}
                                </Typography>
                                {post.is_poll ? (
                                    <div className="poll-marker">
                                        <PollIcon color="disabled"/> <Typography variant="caption" color="textSecondary" component="p">
                                            Has a poll
                                        </Typography>
                                    </div>
                                ) : ''}                              
                            </CardContent>
                            <CardActions>
                                <Typography variant="caption" color="textSecondary" component="p">
                                    Posted by <RouterLink to={`/groups/${post.group._id}/users/${post.creator._id}`}>
                                        {post.creator.fullname}
                                    </RouterLink>
                                </Typography>   
                            </CardActions>
                        </Card>
                    )) : (
                        <Typography variant="h5" align="center" color="secondary">
                            No posts here yet
                        </Typography>  
                    )
                }
            </div>
        </Router>
    );
}

export default Posts;