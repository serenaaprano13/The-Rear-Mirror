import {Link} from 'react-router-dom';

function PageNotFound(){
    return <>
    <p>PAGE NOT FOUND</p>
    <p><Link to='/'>BACK TO HOME PAGE</Link></p>
    </>
}

export {PageNotFound};