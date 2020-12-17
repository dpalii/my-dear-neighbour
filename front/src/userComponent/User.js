import './User.scss';
import 'moment/locale/uk';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory, useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../appContext';
import config from '../config';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { CircularProgress, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import BlockIcon from '@material-ui/icons/Block';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    user: {
        padding: '24px'
    },
    status: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px'
    },
    loading: {
        display: 'flex',
        justifyContent: 'center'
    },
    name: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '16px'
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
    avatar: {
        position: 'relative'
    },
    tableItem: {
        textAlign: 'left',
        paddingRight: '8px'
    },
    controls: {
        display: 'flex'
    }
});

function User(props) {
    const { t } = useTranslation();
    const styles = useStyles();
    const url = config.API_URL;
    const history = useHistory();
    const [me, setMe] = useState({});
    const [user, setUser] = useState({});
    const [update, initiateUpdate] = useState({});
    const context = useContext(AppContext);
    const { groupId, userId } = useParams();

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
                    setMe(data.user);
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
    }, [url, context, groupId, update]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${url}/groups/${groupId}/users/${userId}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${context.token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setUser(data.user);
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
    }, [url, context, groupId, userId, update]);

    const updAccess = async (confirmed) => {
        try {
            const response = await fetch(`${url}/groups/${groupId}/users/${userId}`, {
                method: 'PATCH',
                mode: 'cors',
                headers: {
                    "Authorization": `Bearer ${context.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    confirmed: confirmed,
                    is_admin: false
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

    return (
        <div className={styles.user}>
            {
                user.user ? (
                    <>
                        <div className={styles.status}>
                            <div className={styles.avatar}>
                                <Avatar>{user.user.fullname.slice(0, 1)}</Avatar>
                                {
                                    user.user.is_at_home ? <HomeIcon className={styles.homeIcon}/> : ''
                                }
                            </div>
                            <div className={styles.name}> 
                                <Typography variant="body1">{user.user.fullname}</Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {user.user.is_at_home ? t('user.atHome') : (
                                        user.user.last_status_change ? 
                                        `${t('user.left')} ${moment.utc(new Date(user.user.last_status_change)).locale(context.lang).fromNow()}` :
                                        t('user.unknown')
                                    )}
                                </Typography>
                            </div>
                        </div>
                        <div className={styles.controls}> 
                            {
                                me.is_admin && !user.confirmed ? (
                                    <Button
                                        startIcon={<CheckCircleIcon />}
                                        color="primary"
                                        variant="text"
                                        onClick={() => updAccess(true)}
                                    >
                                        {t('action.approve')}
                                    </Button>
                                ) : ''
                            }
                            {
                                me.is_admin && user.confirmed && me._id !== user._id ? (
                                    <Button
                                        startIcon={<BlockIcon />}
                                        color="secondary"
                                        variant="text"
                                        onClick={() => updAccess(false)}
                                    >
                                        {t('action.block')}
                                    </Button>
                                ) : ''
                            }
                        </div>
                        <div>
                            <Typography gutterBottom variant="h5">{t('user.contacts')}</Typography>  
                            <Typography component="div" variant="body1">
                                <table className={styles.address}>
                                    <tbody>
                                        <tr>
                                            <td className={styles.tableItem}><b>{t('auth.phone')}</b></td>
                                            <td>{user.user.phone}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Typography>
                        </div>
                        <div>
                            <Typography gutterBottom variant="h5">{t('user.address')}</Typography>                            
                            <Typography component="div" variant="body1">
                                <table className={styles.address}>
                                    <tbody>
                                        <tr>
                                            <td className={styles.tableItem}><b>{t('auth.country')}</b></td>
                                            <td>{user.user.country}</td>
                                        </tr>
                                        <tr>
                                            <td className={styles.tableItem}><b>{t('auth.city')}</b></td>
                                            <td>{user.user.city}</td>
                                        </tr>
                                        <tr>
                                            <td className={styles.tableItem}><b>{t('auth.street')}</b></td>
                                            <td>{user.user.street}</td>
                                        </tr>
                                        <tr>
                                            <td className={styles.tableItem}><b>{t('auth.houseNumber')}</b></td>
                                            <td>{user.user.house_number}</td>
                                        </tr>
                                        <tr>
                                            <td className={styles.tableItem}><b>{t('auth.entrance')}</b></td>
                                            <td>{user.user.entrance}</td>
                                        </tr>
                                        <tr>
                                            <td className={styles.tableItem}><b>{t('auth.floor')}</b></td>
                                            <td>{user.user.floor}</td>
                                        </tr>
                                        <tr>
                                            <td className={styles.tableItem}><b>{t('auth.flat')}</b></td>
                                            <td>{user.user.flat}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Typography>
                        </div>
                    </>
                ) : (
                    <div className={styles.loading}>
                        <CircularProgress />
                    </div>
                )
            }
        </div>
    );
}

export default User;