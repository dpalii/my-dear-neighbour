import './CreatePost.scss';
import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Divider } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import config from '../config';
import { AppContext } from '../appContext';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    root: {
        'margin-left': 'auto',
        'display': 'flex'
    }
});

function CreatePost(props) {
    const { t } = useTranslation();
    const styles = useStyles();
    const { id } = useParams();
    const url = config.API_URL;
    const context = useContext(AppContext);
    const history = useHistory();
    const [error, setError] = useState('');
    const [ formData, setFormData ] = useState({
        title: '',
        content: '',
        is_poll: false,
        options: []
    });

    const handleSubmit = async () => {
        let err = '';
        if (!formData.title) {
            err = t('createPost.error.title');
        } 
        else if (!formData.content) {
            err = t('createPost.error.content');
        } 
        else if (formData.is_poll && formData.options.length < 2) {
            err = t('createPost.error.poll.length');
        } 
        else if (formData.is_poll && formData.options.find(x => !x.name)) {
            err = t('createPost.error.poll.names');
        } 
        else {
            try {
                const response = await fetch(`${url}/groups/${id}/posts`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${context.token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...formData,
                        options: formData.is_poll ? formData.options.map(x => ({name: x.name})) : []
                    })
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    history.push(`/groups/${id}`);
                }
                else {
                    console.log(data.message);
                    err = t('createPost.error.http.client');
                }
            }
            catch(error) {
                console.log(error)
                err = t('createPost.error.http.server');
            }
        }

        setError(err);
    }

    return (
        <div className="form-wrapper">
            <form className="post-form">
                <Typography gutterBottom variant="h5">{t('createPost.title')}</Typography>
                <Divider />
                <TextField 
                    margin="normal"
                    fullWidth
                    label={t('createPost.form.title')}
                    autoFocus
                    type="text" 
                    value={formData.title} 
                    onChange={
                        (e) => {
                            setFormData({
                                ...formData,
                                title: e.target.value
                            });
                        }
                    }
                />
                <TextField 
                    margin="normal"
                    fullWidth
                    label={t('createPost.form.content')}
                    type="text" 
                    value={formData.content} 
                    multiline
                    rows={5}
                    onChange={
                        (e) => {
                            setFormData({
                                ...formData,
                                content: e.target.value
                            });
                        }
                    }
                />
                <div className="poll-controls">
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={formData.is_poll}
                        onChange={() => {
                            setFormData({
                                ...formData,
                                is_poll: !formData.is_poll
                            });
                        }}
                        name="isPoll"
                        color="primary"
                        />
                    }
                    label={t('createPost.form.isPoll')}
                    />
                    <Button
                        disabled={!formData.is_poll || formData.options.length >= 10}
                        variant="text"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            if (formData.options.length < 10) {
                                setFormData({
                                    ...formData,
                                    options: [
                                        ...formData.options,
                                        {
                                            id: formData.options.length + 1,
                                            name: ''
                                        }
                                    ]
                                });
                            }
                        }}
                    >
                        {t('createPost.form.addOption')}
                    </Button>
                </div>
                {formData.is_poll ? (
                    <div className="poll-options">
                        {formData.options.map(option => (
                            <TextField key={option.id}
                                margin="normal"
                                fullWidth
                                label={`${t('createPost.form.pollOption')} ${option.id}`}
                                type="text" 
                                value={option.name} 
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="delete option"
                                                onClick={(e) => {
                                                    const index = formData.options.findIndex(x => x.id === option.id);
                                                    formData.options.splice(index, 1);
                                                    setFormData({
                                                        ...formData,
                                                        options: formData.options.map((x, i) => ({
                                                            id: i + 1,
                                                            name: x.name
                                                        }))
                                                    });
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={
                                    (e) => {
                                        setFormData({
                                            ...formData,
                                            options: formData.options.map(x => x.id === option.id ? {
                                                ...x,
                                                name: e.target.value
                                            } : x)
                                        });
                                    }
                                }
                            />
                        ))}
                    </div>
                ) : ''}
                {
                    error ? (
                        <div className="error">
                            <ErrorOutlineIcon />
                            <Typography color="error" variant="caption">
                                {error}
                            </Typography>
                        </div>
                    ) : ''
                }
                <Button
                    classes={{root: styles.root}}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    {t('createPost.form.submit')}
                </Button>
            </form>
        </div>
    );
}

export default CreatePost;