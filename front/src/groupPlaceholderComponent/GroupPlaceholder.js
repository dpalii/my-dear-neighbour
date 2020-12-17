import './GroupPlaceholder.scss';
import picture from '../assets/neighbourhood.png'
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

function GroupPlaceholder(props) {
    const { t } = useTranslation();
    return (
        <div className="group-placeholder-wrapper">
            <div className="group-placeholder">
                <img src={picture} alt="No group chosen"/>
                <Typography variant="h4" align="center">{t('group.placeholder')}</Typography>
            </div>
        </div>
    );
}

export default GroupPlaceholder;