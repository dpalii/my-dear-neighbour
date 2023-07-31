import './Register.scss'
import { 
    useState
} from 'react';
import { 
    Link, 
    useHistory
} from 'react-router-dom';
import {
    Button,
    TextField,
    Typography
} from '@material-ui/core';
import LanguageSwitch from '../languageSwitchComponent/LanguageSwitch';
import { useTranslation } from 'react-i18next';
import config from '../config';

function Register(props) {
    const url = `${config.API_URL}/auth`;

    const { t } = useTranslation();
    const history = useHistory();
    const [ formData, setFormData ] = useState({
        phone: '',
        fullname: '',
        password: '',
        repeatedPassword: '',
        address: {
            country: '',
            city: '',
            street: '',
            house_number: 0,
            entrance: 0,
            floor: 0,
            flat: 0
        }
    });
    const [ error, setError ] = useState('');

    const registerHandler = async (e) => {
        e.preventDefault();
        setError('');
        
        const nameRegEx = new RegExp(/^[а-яА-ЯёЁіїІЇєЄ0-9a-zA-Z\-\s]+$/);
        const phoneRegEx = new RegExp(/^\+[0-9]{10,12}$/);
        const numberRegEx = new RegExp(/^[1-9]\d*$/);

        let err = '';

        try {
            const { phone, fullname, password, repeatedPassword, address } = formData;
            
            if (!phone || !phoneRegEx.test(phone)) {
                err = t('auth.error.phone');
                setError(err);
                return;
            }
    
            if (!fullname || !nameRegEx.test(fullname)) {
                err = t('auth.error.fullname');
                setError(err);
                return;
            }

            if (!password) {
                err = t('auth.error.password');
                setError(err);
                return;
            }

            if (password !== repeatedPassword) {
                err = t('auth.error.repeatPassword');
                setError(err);
                return;
            }

            if (!address || 
                !address.country || !nameRegEx.test(address.country) ||
                !address.city || !nameRegEx.test(address.city) ||
                !address.street || !nameRegEx.test(address.street) ||
                !address.house_number || !numberRegEx.test(address.house_number) ||
                !address.entrance || !numberRegEx.test(address.entrance) || 
                !address.floor || !numberRegEx.test(address.floor) || 
                !address.flat || !numberRegEx.test(address.flat)) {
                err = t('auth.error.address');
                setError(err);
                return;
            }
            else {
                formData.address.house_number = parseInt(address.house_number);
                formData.address.entrance = parseInt(address.entrance);
                formData.address.floor = parseInt(address.floor);
                formData.address.flat  = parseInt(address.flat);
            }

            const response = await fetch(url + '/register', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                history.push('/login');
            }
            else {
                err = t('auth.error.phoneNotUnique');
                setError(err);
            }
        }
        catch(e) {
            console.log(e);
            err = t('auth.error.register');
            setError(err);
        } 
    }

    return (
        <div className="register">
            <Typography variant="h5">{t('auth.register')}</Typography>
            <form className="register-form">
                <div className="form-group">
                    <Typography variant="h6">{t('auth.credentials')}</Typography>
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
                        label={t('auth.fullname')}
                        type="text" 
                        value={formData.fullname} 
                        onChange={
                            (e) => {
                                setFormData({
                                    ...formData,
                                    fullname: e.target.value
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
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={t('auth.repeatPassword')}
                        type="password" 
                        value={formData.repeatedPassword} 
                        onChange={
                            (e) => {
                                setFormData({
                                    ...formData,
                                    repeatedPassword: e.target.value
                                });
                            }
                        }
                    />
                </div>
                <div className="form-group">
                    <Typography variant="h6">{t('auth.address')}</Typography>
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={t('auth.country')}
                        type="text" 
                        value={formData.address.country} 
                        onChange={
                            (e) => {
                                setFormData({
                                    ...formData,
                                    address: {
                                        ...formData.address,
                                        country: e.target.value
                                    }
                                });
                            }
                        }
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={t('auth.city')}
                        type="text" 
                        value={formData.address.city} 
                        onChange={
                            (e) => {
                                setFormData({
                                    ...formData,
                                    address: {
                                        ...formData.address,
                                        city: e.target.value
                                    }
                                });
                            }
                        }
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={t('auth.street')}
                        type="text" 
                        value={formData.address.street} 
                        onChange={
                            (e) => {
                                setFormData({
                                    ...formData,
                                    address: {
                                        ...formData.address,
                                        street: e.target.value
                                    }
                                });
                            }
                        }
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={t('auth.houseNumber')}
                        type="number" 
                        value={formData.address.house_number} 
                        onChange={
                            (e) => {
                                setFormData({
                                    ...formData,
                                    address: {
                                        ...formData.address,
                                        house_number: e.target.value
                                    }
                                });
                            }
                        }
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={t('auth.entrance')}
                        type="number" 
                        value={formData.address.entrance} 
                        onChange={
                            (e) => {
                                setFormData({
                                    ...formData,
                                    address: {
                                        ...formData.address,
                                        entrance: e.target.value
                                    }
                                });
                            }
                        }
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={t('auth.floor')}
                        type="number" 
                        value={formData.address.floor} 
                        onChange={
                            (e) => {
                                setFormData({
                                    ...formData,
                                    address: {
                                        ...formData.address,
                                        floor: e.target.value
                                    }
                                });
                            }
                        }
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={t('auth.flat')}
                        type="number" 
                        value={formData.address.flat} 
                        onChange={
                            (e) => {
                                setFormData({
                                    ...formData,
                                    address: {
                                        ...formData.address,
                                        flat: e.target.value
                                    }
                                });
                            }
                        }
                    />
                </div>
                
                <Typography id="error" color="error">{ error }</Typography>
                <Button color="primary" variant="contained" onClick={registerHandler} type="submit">
                    {t('auth.register')}
                </Button>
            </form>
            <Link to='/login'>
                {t('auth.loginLink')}
            </Link>
            <LanguageSwitch />
        </div>
    );
}

export default Register;