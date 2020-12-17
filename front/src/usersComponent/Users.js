import './Users.scss';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import RefreshIcon from '@material-ui/icons/Refresh';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../appContext';
import config from '../config';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    inline: {
        display: 'inline'
    },
    link: {
        cursor: 'pointer'
    },
    list: {
        height: 'calc(100% - 72px)',
        padding: '24px',
        boxSizing: 'border-box',
        overflowY: 'auto'
    },
    atHome: {
        position: 'relative',
    },
    loading: {
        display: 'block',
        margin: 'auto',
        marginTop: '24px'
    },
    homeIcon: {
        position: 'absolute',
        left: '0',
        bottom: '0',
        color: 'white',
        fontSize: '10px',
        padding: '2px',
        'background-color': 'green',
        'border-radius': '50%'        
    },
    btnRoot: {
        'margin-right': '12px'
    }
});

function Users(props) {
    const { t } = useTranslation();
    const { id } = useParams();
    const url = config.API_URL;
    const context = useContext(AppContext);
    const history = useHistory();
    const styles = useStyles();
    const [groupUser, setGroupUser] = useState({});
    const [groupUsers, setGroupUsers] = useState({});
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
                const response = await fetch(`${url}/groups/${id}/users?show_requests=${unapproved}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${context.token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setGroupUsers(data.users);
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
    }, [url, context, id, update, unapproved]);

    return (
        <div>
            <div className="user-list-controls">
                <Button 
                    classes={{root: styles.btnRoot}}
                    display="block"
                    variant="contained"
                    startIcon={<InfoIcon />}
                    onClick={() => history.push(`/groups/${id}`)}
                >
                    {t('users.posts')}
                </Button>
                {
                    groupUser && groupUser.is_admin ? (
                        <Button 
                            classes={{root: styles.btnRoot}}
                            display="block"
                            variant="contained"
                            startIcon={<CheckCircleIcon />}
                            onClick={() => setUnapproved(!unapproved)}
                        >
                            {!unapproved ? t('users.unapproved') : t('users.approved')}
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
            {
                groupUsers.length > 0 ? (
                    <List className={styles.list}>
                        {
                            groupUsers.map(user => (
                                <React.Fragment key={user._id}>
                                    <ListItem alignItems="flex-start" >
                                        <ListItemAvatar className={styles.atHome}>
                                            <>
                                                <Avatar>
                                                    {user.user.fullname.slice(0, 1)}
                                                </Avatar>
                                                {
                                                    user.user.is_at_home ? <HomeIcon className={styles.homeIcon}/> : ''
                                                }
                                            </>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Link 
                                                    classes={{root: styles.link}}
                                                    onClick={() => history.push(`/groups/${id}/users/${user.user._id}`)}
                                                >
                                                    {user.user.fullname}
                                                </Link>}
                                            secondary={user.is_admin ? t('user.admin') : (
                                                    user.confirmed ? t('user.member') : t('user.pending') 
                                                )}
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </React.Fragment>
                            ))
                        }
                        
                    </List>
                ) : (
                    <div className={styles.list}>
                        <Typography align="center" variant="h5" color="textSecondary">{t('users.empty')}</Typography>
                    </div>
                )
            }
        </div>
    )
}

export default Users;