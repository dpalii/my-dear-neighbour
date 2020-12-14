import './Login.scss'
import { 
    useState
} from 'react';
import { 
    Link, 
    useHistory
} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useContext } from 'react';
import { AppContext } from '../appContext';
import LanguageSwitch from '../languageSwitchComponent/LanguageSwitch';
import { useTranslation } from 'react-i18next';
import config from '../config';

function Login(props) {
    const url = `${config.API_URL}/auth`;
    const phoneRegEx = new RegExp(/^\+[0-9]{10,12}$/);

    const { t } = useTranslation();
    const history = useHistory();
    const context = useContext(AppContext);

    const [ formData, setFormData ] = useState({
        phone: '',
        password: ''
    });
    const [ error, setError ] = useState('');

    const loginHandler = async (e) => {
        e.preventDefault();

        let err = '';

        if (!phoneRegEx.test(formData.phone)) {
            err = t('auth.error.phone');
        }
        else
        if (!formData.password) {
            err = t('auth.error.password');
        }
        else {
            try {
                const response = await fetch(url + '/login', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        phone: formData.phone,
                        password: formData.password
                    })
                });
                const data = await response.json();

                if (response.ok) {
                    context.setToken(data.jwt_token);
                    history.push('/groups');
                }
                else {
                    err = t('auth.error.wrongCredentials');
                }

            }
            catch(e) {
                console.log(e);
                err = t('auth.error.login');
            }
        } 
        
        setError(err);
    }

    return (
        <div className="auth">
            <Typography variant="h5">{t('auth.login')}</Typography>
            <form>
                <TextField 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label={t('auth.phone')}
                    autoFocus
                    type="text" 
                    value={formData.phone} 
                    onChange={
                        (e) => {
                            setFormData({
                                ...formData,
                                phone: e.target.value
                            });
                        }
                    }
                />
                <TextField 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label={t('auth.password')}
                    type="password" 
                    value={formData.password} 
                    onChange={
                        (e) => {
                            setFormData({
                                ...formData,
                                password: e.target.value
                            });
                        }
                    } 
                />
                <Typography color="error">{ error }</Typography>
                <Button color="primary" variant="contained" onClick={loginHandler} type="submit">
                    {t('auth.login')}
                </Button>
            </form>
            <Link to="/register">
                {t('auth.registerLink')}
            </Link>
            <LanguageSwitch />
        </div>
    );
}

export default Login;