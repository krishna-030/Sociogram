import { useState } from 'react';
import './room.css'
import {Link} from 'react-router-dom'

let user;

const sendUser = () => {
    user = document.getElementById('joinInput').value
    document.getElementById('joinInput').value = ""
}

const Room = () => {

    const [name, setName] = useState('')


    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <h1>Join Room</h1>
                <input onChange={ (e) => setName(e.target.value) } type="text" id="joinInput" placeholder="Enter your name" />
                <Link onClick={ (event) => !name ? event.preventDefault() : null } to='/Chat'><button onClick={sendUser} className="joinbtn">Join</button></Link>
            </div>
        </div>
    )
}

export default Room
export {user}