import UserContext from '../contexts/UserContext'
import { useContext } from 'react';

export default function LogIn(){

    const { setUser } = useContext(UserContext);

    return(
        <div>LogIn</div>
    )
}