import './Content.scss';
import { 
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import MyGroups from '../myGroupsComponent/MyGroups';
import Profile from '../profileComponent/Profile';
import LanguageSwitch from '../languageSwitchComponent/LanguageSwitch';
import Group from '../groupComponent/Group';
import GroupPlaceholder from '../groupPlaceholderComponent/GroupPlaceholder';
import Post from '../postComponent/Post';
import logo from '../assets/logo.png';
import { Divider, Typography } from '@material-ui/core';
import CreatePost from '../createPostComponent/CreatePost';
import Users from '../usersComponent/Users';
import User from '../userComponent/User';


function Content(props) {
    return (
        <Router>
            <nav className="menu">
                <div className="sidebar-header">
                    <div className='logo-wrapper'>
                        <img className="logo" src={logo} alt="logo"></img>
                        <Typography variant="h5">My Dear Neaighbour</Typography>
                    </div>
                    <LanguageSwitch />
                </div>
                <Divider />
                <Profile />
                <MyGroups />
            </nav>
            <main className="main">
                <Switch>
                    <Route exact path="/groups">
                        <GroupPlaceholder />
                    </Route>
                    <Route path="/groups/:groupId/posts/:postId">
                        <Post />
                    </Route>
                    <Route path="/groups/:groupId/users/:userId">
                        <User />
                    </Route>
                    <Route path="/groups/:id/users">
                        <Users />
                    </Route>
                    <Route path="/groups/:id/new-post">
                        <CreatePost />
                    </Route>
                    <Route path="/groups/:id">
                        <Group />
                    </Route>
                </Switch>
            </main>
        </Router>
    );
}

export default Content;