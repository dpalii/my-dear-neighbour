import './LanguageSwitch.scss'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AppContext } from '../appContext';

function LanguageSwitch(props) {
    const context = useContext(AppContext)
    const { i18n } = useTranslation(context.lang);

    const handleChange = (event) => {
        const value = event.target.value;

        context.setLang(value);
        i18n.changeLanguage(value);
    }

    return (
        <Select
          value={context.lang}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="ua">УКР</MenuItem>
        </Select>
    );
}

export default LanguageSwitch;