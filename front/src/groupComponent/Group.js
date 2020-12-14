import './Group.scss';
import { 
    useParams
} from 'react-router-dom';
import Posts from '../postsComponent/Posts';


function Group(props) {
    const { id } = useParams();
    
    return (
        <div className="group">
            <Posts id={id} />
        </div>
    );
}

export default Group;