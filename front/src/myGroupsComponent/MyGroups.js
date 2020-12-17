import { useContext, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './MyGroups.scss';
import config from '../config';
import { AppContext } from '../appContext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { Typography } from '@material-ui/core';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Accordion = withStyles({
    root: {
        background: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
            borderBottom: '1px solid rgba(0, 0, 0, .125)',
        },
    },
    expanded: {},
  })(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);
  

const prefixes = [
    'street',
    'house',
    'entrance',
    'floor',
    'flat'
];

function MyGroups(props) {
    const { t } = useTranslation();
    const url = config.API_URL;
    const history = useHistory();
    const [groups, setGroups] = useState([]);
    const [availableGroups, setAvailableGroups] = useState([]);
    const context = useContext(AppContext);

    const [update, initiateUpdate] = useState({});

    const joinGroup = async (groupId) => {
        try {
            const response = await fetch(url + `/groups/${groupId}/users`, {
                method: 'POST',
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

    const goToGroup = (groupId) => {
        history.push(`/groups/${groupId}`);
    }

    useEffect(() => {
        const getGroups = async () => {
            try {
                const response = await fetch(url + '/users/me/groups', {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${context.token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    const groupList = data.groups;
                    setGroups(groupList);
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
    }, [url, context, update]);

    
    useEffect(() => {
        const getAvailableGroups = async () => {
            try {
                const response = await fetch(url + '/groups', {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${context.token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    const groupList = data.groups.filter(item => 
                        !groups.find(userGroup => item.name === userGroup.group.name)
                    );

                    setAvailableGroups(groupList);
                }
                else {
                    console.log(data.message);
                }
            }
            catch(error) {
                console.log(error)
            }
        }

        getAvailableGroups();
    }, [url, context, groups, update]);

    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h5">{t('group.myGroups.title')}</Typography>
                </AccordionSummary>    
                <AccordionDetails>
                    <List classes={{root: 'groups'}}>
                        {
                            groups.length > 0  ? 
                            groups.map(item => {
                                const name = item.group.name.split(', ')
                                    .slice(2)
                                    .map((address, i) => `${t(`group.${prefixes[i]}`)} ${address}`)
                                    .join(', ');

                                return (
                                    <ListItem key={item._id}>
                                        <ListItemText
                                            primary={name}
                                            secondary={!item.confirmed ? t('user.pending') : (
                                                item.is_admin ? t('user.admin') : t('user.member')
                                            )}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton onClick={() => goToGroup(item.group._id)} disabled={!item.confirmed} edge="end" aria-label="Go to group" title={t('group.goto')}>
                                                <ArrowForward />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            }) : (
                                <ListItem>
                                    <ListItemText
                                        primary={t('group.myGroups.empty')}
                                    />
                                </ListItem>
                            )
                        }
                    </List> 
                </AccordionDetails>   
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h5">{t('group.available.title')}</Typography>
                </AccordionSummary>    
                <AccordionDetails>
                    <List classes={{root: 'groups'}}>
                        {
                            availableGroups.length > 0 ?
                            availableGroups.map(item => {
                                const name = item.name.split(', ')
                                    .slice(2)
                                    .map((address, i) => `${t(`group.${prefixes[i]}`)} ${address}`)
                                    .join(', ');
                                return (
                                    <ListItem key={item._id}>
                                        <ListItemText
                                            primary={name}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton onClick={() => joinGroup(item._id)} edge="end" aria-label="join group" title={t('group.join')}>
                                                <Add />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            }) : (
                                <ListItem>
                                    <ListItemText
                                        primary={t('group.available.empty')}
                                    />
                                </ListItem>
                            )
                        }
                    </List> 
                </AccordionDetails>   
            </Accordion>
        </>
    );
}

export default MyGroups;