import './GroupPlaceholder.scss';
import picture from '../assets/neighbourhood.png'
import { Typography } from '@material-ui/core';

function GroupPlaceholder(props) {
    return (
        <div className="group-placeholder-wrapper">
            <div className="group-placeholder">
                <img src={picture} alt="No group chosen"/>
                <Typography variant="h4" align="center">Choose a group from the list</Typography>
            </div>
        </div>
    );
}

export default GroupPlaceholder;