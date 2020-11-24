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

function Register(props) {
    const url = 'http://localhost:8080/api/auth';

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
            houseNumber: 0,
            entrance: 0,
            floor: 0,
            flat: 0
        }
    });
    const [ error, setError ] = useState('');

    const registerHandler = async (e) => {
        e.preventDefault();
        
        const nameRegEx = new RegExp(/^[а-яА-ЯёЁіїІЇєЄ0-9a-zA-Z\-\s]+$/);
        const phoneRegEx = new RegExp(/^\+[0-9]{10,12}$/);
        const numberRegEx = new RegExp(/^[1-9]\d*$/);

        let err = '';

        try {
            const { phone, fullname, password, repeatedPassword, address } = formData;
            
            if (!phone || !phoneRegEx.test(phone)) {
                err = "Invalid phone";
                setError(err);
                return;
            }
    
            if (!fullname || !nameRegEx.test(fullname)) {
                err = "Invalid name";
                setError(err);
                return;
            }

            if (!password) {
                err = "Password not specified";
                setError(err);
                return;
            }

            if (password !== repeatedPassword) {
                err = "Passwords do not match";
                setError(err);
                return;
            }

            console.log(address);

            if (!address || 
                !address.country || !nameRegEx.test(address.country) ||
                !address.city || !nameRegEx.test(address.city) ||
                !address.street || !nameRegEx.test(address.street) ||
                !address.houseNumber || !numberRegEx.test(address.houseNumber) ||
                !address.entrance || !numberRegEx.test(address.entrance) || 
                !address.floor || !numberRegEx.test(address.floor) || 
                !address.flat || !numberRegEx.test(address.flat)) {
                err = "Invalid address";
                setError(err);
                return;
            }
            else {
                formData.address.houseNumber = parseInt(address.houseNumber);
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
            const data = await response.json();

            if (response.ok) {
                history.push('/login');
            }
            else {
                err = data.message;
                setError(err);
            }
        }
        catch(e) {
            console.log(e);
            err = 'Request failed, try again';
            setError(err);
        } 
    }

    return (
        <div className="register">
            <Typography variant="h5">Sign up</Typography>
            <form className="register-form">
                <div className="form-group">
                    <Typography variant="h6">Credentials:</Typography>
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
                        label="Full name:"
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
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Repeat password:"
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
                    <Typography variant="h6">Address:</Typography>
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Country:"
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
                        label="City:"
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
                        label="Street:"
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
                        label="House number:"
                        type="number" 
                        value={formData.address.houseNumber} 
                        onChange={
                            (e) => {
                                setFormData({
                                    ...formData,
                                    address: {
                                        ...formData.address,
                                        houseNumber: e.target.value
                                    }
                                });
                            }
                        }
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Entrance:"
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
                        label="Floor:"
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
                        label="Flat:"
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
                    Submit
                </Button>
            </form>
            <Link to='/login'>
                Already have an account?
            </Link>
        </div>
    );
}

export default Register;