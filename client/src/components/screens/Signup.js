import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'


const Signup = () => {

    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = () =>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","sociogram")
        data.append("cloud-name","krishnasociogram1234")
        fetch("https://api.cloudinary.com/v1_1/krishnasociogram1234/image/upload",{
            method : "post",
            body: data      
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const uploadFields = () =>{
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            M.toast({ html: "Invalid email", classes: "#d50000 red accent-4" })
            return
        }
        fetch("http://localhost:5000/Signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                pic:url
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#d50000 red accent-4" })
                }
                else {
                    M.toast({ html: data.message, classes: "#4caf50 green" })
                    history.push('/login')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const PostData = () => {
        if(image){
            uploadPic()
        }
        else{
            uploadFields()
        }
        
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Sociogram</h2>
                <input type="text" placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input type="email" placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue lighten-2">
                        <span>Upload pic</span>
                        <input type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input type="text" className="file-path validate" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 signup-btn"
                    onClick={() => PostData()}
                >
                    Sign Up
                </button>

                <h5>
                    <Link to="/Login" className="login-link">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup