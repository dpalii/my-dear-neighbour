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

function Login(props) {
    const url = 'http://localhost:8080/api/auth';
    const phoneRegEx = new RegExp(/^\+[0-9]{10,12}$/);

    const history = useHistory();
    const [ formData, setFormData ] = useState({
        phone: '',
        password: ''
    });
    const [ error, setError ] = useState('');

    const loginHandler = async (e) => {
        e.preventDefault();

        let err = '';

        if (!formData.phone) {
            err = 'Enter phone';
        }
        else
        if (!phoneRegEx.test(formData.phone)) {
            err = 'Phone is invalid';
        }
        else
        if (!formData.password) {
            err = 'Enter password';
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
                    props.authCallback(data.jwt_token);
                    history.push('/groups');
                }
                else {
                    err = data.message;
                }

            }
            catch(e) {
                console.log(e);
                err = 'Request failed, try again';
            }
        } 
        
        setError(err);
    }

    return (
        <div className="auth">
            <Typography variant="h5">Sign in</Typography>
            <form>
                <TextField 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Phone number:"
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
                    label="Password:"
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
                    Submit
                </Button>
            </form>
            <Link to="/register">
                Don't have an account?
            </Link>
        </div>
    );
}

export default Login;