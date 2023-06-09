import { CalendarViewDay, Create, EventNote, Image, Subscriptions } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { db } from '../../Firebase'
import InputOptions from '../InputOptions/InputOptions'
import Post from '../Post/Post'
import './feed.css'
import firebase from 'firebase/compat/app';
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import FlipMove from 'react-flip-move'

const Feed = () => {
    const user = useSelector(selectUser)
    const[input, setInput] = useState('')
    const[posts, setPosts] = useState([])

    
    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => setPosts(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data:doc.data(),
            }))
        ))
    }, [])
        
    const sendPost = e => {
        e.preventDefault()

        db.collection('posts').add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoUrl || '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput('')
    }
    return (
    <div className='feed'>
        <div className="feed__inputContainer">
            <div className="feed__input">
                <Create />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" />
                    <button onClick={sendPost} type='submit'>Send</button>
                </form>
            </div>
            <div className="feed__inputOptions">
                <InputOptions Icon={Image} title='Photo' color='#70b5f9' />
                <InputOptions Icon={Subscriptions} title='Video' color='#e7a33e' />
                <InputOptions Icon={EventNote} title='Event' color='#c0cbcd' />
                <InputOptions Icon={CalendarViewDay} title='Write article' color='#7fc15e' />
            </div>
        </div>

        <FlipMove>
        {
            posts.map(({ id, data : {name, description, message, photoUrl } }) => (
                <Post
                 key={id}
                 name={name}
                 description={description}
                 message={message}
                 photoUrl={photoUrl}
                />
            ))
        }
        </FlipMove>
    </div>
  )
}

export default Feed