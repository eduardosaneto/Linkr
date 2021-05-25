import {BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Hashtag from './Hashtag';
import LogIn from './LogIn';
import Mylikes from './MyLikes';
import MyPosts from './MyPosts';
import SingUp from './SingUp';
import Timeline from './Timeline';
import User from './User';

import UserContext from "../contexts/UserContext"


export default function App(){

    const [ user, setUser ] = useState(undefined);

    return (
        <UserContext.Provider value={{user, setUser}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <LogIn />
                    </Route>
                    <Route path="/sing-up" exact>
                        <SingUp />
                    </Route>
                    <Route path="/timeline" exact>
                        <Timeline />
                    </Route>
                    <Route path="/my-posts" exact>
                        <MyPosts />
                    </Route>
                    <Route path="/my-likes" exact>
                        <Mylikes />
                    </Route>
                    <Route path="/user/:id" exact>
                        <User />
                    </Route>    
                    <Route path="/hashtag/:hashtag" exact>
                        <Hashtag />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
}