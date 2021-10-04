import { useHistory } from "react-router"
import M from 'materialize-css'
import { useState, useContext } from "react"
import { UserContext } from "../../App"
import { Link } from "react-router-dom"


const Login = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const PostData = () => {
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            M.toast({ html: "Invalid email", classes: "#d50000 red accent-4" })
            return
        }
        fetch("http://localhost:5000/Login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#d50000 red accent-4" })
                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    M.toast({ html: "Logged in successfully", classes: "#4caf50 green" })
                    history.push('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Sociogram</h2>
                <input type="email" placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 login-btn"
                    onClick={() => PostData()}
                >Login</button>
                <h5>
                    <Link to="/Signup" className="signup-link">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login