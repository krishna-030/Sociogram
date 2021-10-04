import { Link, useHistory, } from 'react-router-dom'
import { useContext, useRef, useEffect, useState } from 'react'
import { UserContext } from '../App'
import M from 'materialize-css'



const Navbar = () => {
    const [search, setSearch] = useState("")
    const searchModal = useRef(null)
    const [userDetails, setUserDetails] = useState([])
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        M.Modal.init(searchModal.current)
    }, [])
    const renderList = () => {
        if (state) {
            return [
                <li key="1"><Link to=""><i data-target="modal1" className="material-icons modal-trigger">search</i></Link></li>,
                <li key="2"><Link to="myfollowingpost">My Following Posts</Link></li>,
                <li key="20"><Link to="Room">Room</Link></li>,
                <li key="3"><Link to="CreatePost">CreatePost</Link></li>,
                <li key="4"><Link to="Profile">Profile</Link></li>,
                <li key="5">
                    <button className="btn #d50000 red accent-4"
                        onClick={() => {
                            localStorage.clear()
                            dispatch({ type: "CLEAR" })
                            history.push('/login')
                        }}
                    >
                        Logout
                    </button>
                </li>
            ]
        }
        else {
            return [
                <li key="6"><Link to="Login">Login</Link></li>,
                <li key="7"><Link to="Signup">Signup</Link></li>
            ]
        }
    }

    const fetchUsers = (query) => {
        setSearch(query)
        fetch('/search-users', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                query
            })
        })
            .then(res => res.json())
            .then(result => {
                setUserDetails(result.user)
            })
    }

    return (
        <nav>
            <div className="nav-wrapper black">
                <Link to={state ? "/" : "/login"} className="brand-logo left">Sociogram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderList()}
                </ul>
            </div>
            <div id="modal1" className="modal" ref={searchModal} style={{ color: "black" }}>
                <div className="modal-content">
                    <input type="text" placeholder="search user"
                        value={search}
                        onChange={(e) => fetchUsers(e.target.value)}
                    />
                    <ul className="collection">
                        {userDetails.map(item => {
                            return <Link to={item._id !== state._id ? '/profile/' + item._id : '/profile'} onClick={() => {
                                M.Modal.getInstance(searchModal.current).close()
                                setSearch('')
                            }}><li style={{ color: "black" }} className="collection-item">{item.email}</li></Link>
                        })}
                    </ul>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch("")}>close</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar


