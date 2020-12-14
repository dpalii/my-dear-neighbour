import './Content.scss';
import { 
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import MyGroups from '../myGroupsComponent/MyGroups';
import Profile from '../profileComponent/Profile';
import LanguageSwitch from '../languageSwitchComponent/LanguageSwitch';
import Group from '../groupComponent/Group'
import logo from '../logo.svg';
import { Divider } from '@material-ui/core';


function Content(props) {
    return (
        <Router>
            <nav className="menu">
                <div className="logo-wrapper">
                    <img className="logo" src={logo} alt="logo"></img>
                    <LanguageSwitch />
                </div>
                <Divider />
                <Profile />
                <MyGroups />
            </nav>
            <main className="main">
                <Switch>
                    <Route path="/groups/:id">
                        <Group />
                    </Route>
                </Switch>
            </main>
        </Router>
    );
}

export default Content;