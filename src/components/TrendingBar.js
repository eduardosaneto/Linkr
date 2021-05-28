import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Usercontext from '../contexts/UserContext'

export default function TrendingBar() {
    const { user, setUser } = useContext(Usercontext)
    const [hashtags, setHashtags] = useState([])
    const localstorage = JSON.parse(localStorage.user);
    const token = localstorage.token;

    useEffect(() => trendingTopics(),[])

    function trendingTopics() {
        const config = {headers: {Authorization: `Bearer ${token}`}}
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending", config)

        request.then( response => {
            setHashtags(response.data.hashtags);
            setUser(localStorage.user);
        })
    }

    return (
        <>
        <h1>trending</h1>
        <ul> 
            { hashtags.map(hashtag => <Link to={`/hashtag/${hashtag.name}`}><li >#{hashtag.name}</li></Link>)}
        </ul>
        </>
    )
}