import './Posts.scss';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { AppContext } from '../appContext';
import config from '../config';
import PollIcon from '@material-ui/icons/Poll';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    btnRoot: {
        'margin-right': '12px'
    },
    cardRoot: {
        'margin-bottom': '24px'
    },
    linkRoot: {
        'cursor': 'pointer'
    },
    avatarRoot: {
        'text-decoration': 'none',
        'cursor': 'pointer'
    }
});

function Posts(props) {
    const id = props.id;
    const url = config.API_URL;
    const context = useContext(AppContext);
    const history = useHistory();
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
                    !unapproved && groupUser.is_admin ? (
                        <Button
                            display="block"
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => history.push(`${id}/new-post`)}
                        >
                            Create post
                        </Button>
                    ) : ''
                }
                <div className="filler"></div>
                <IconButton 
                    classes={{root: "refresh-btn"}}
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
                                title={<Link
                                    classes={{root: styles.linkRoot}}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        history.push(`/groups/${post.group._id}/posts/${post._id}`);
                                    }}
                                >
                                    {post.title}
                                </Link>}
                                subheader={(new Date(post.created_date)).toLocaleDateString(context.lang)}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="body2" component="p">
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
                        </Card>
                    )) : (
                        <Typography variant="h5" align="center" color="textSecondary">
                            No posts here yet
                        </Typography>  
                    )
                }
            </div>
        </Router>
    );
}

export default Posts;