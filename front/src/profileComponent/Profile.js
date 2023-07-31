import './Profile.scss';
import { useState, useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AppContext } from '../appContext';
import config from '../config';
import { Button, ButtonGroup, Divider, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Content(props) {
    const { t } = useTranslation();
    const url = config.API_URL;
    const [user, setUser] = useState({});
    const context = useContext(AppContext);
    const history = useHistory();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(url + '/users/me', {
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
    }, [url, context]);

    const handleLogout = () => {
        context.setToken('');
        history.push('/login');
    }

    const handleEdit = async () => {
        console.log('edit');
    }

    return (
        <section className="profile-wrapper">
            {
                user.fullname ? (
                    <div className="profile">
                        <Avatar>{user.fullname.slice(0, 1) || null}</Avatar>
                        <Typography noWrap display="block" classes={{root: "username"}} variant="h5">{user.fullname}</Typography>
                        <ButtonGroup disableElevation size="small" classes={{root: 'controls'}}>
                            {/* <Button onClick={handleEdit} variant="contained" color="default">Edit</Button> */}
                            <Button onClick={handleLogout} variant="outlined" style={{color: '#000', borderColor: '#000'}}>{t('profile.logout')}</Button>
                        </ButtonGroup>
                    </div>
                ) : (
                    <div className="loading">
                        <CircularProgress />
                    </div>
                )
            }
            <Divider variant="fullWidth"/>
        </section>
    );
}

export default Content;