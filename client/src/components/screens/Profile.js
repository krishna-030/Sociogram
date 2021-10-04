import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../App"

const Profile = () => {
    const [myPics, setPics] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    useEffect(() => {
        fetch('/myposts', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setPics(result)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (image) {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "sociogram")
            data.append("cloud-name", "krishnasociogram1234")
            fetch("https://api.cloudinary.com/v1_1/krishnasociogram1234/image/upload", {
                method: "post",
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    fetch('/updateprofile', {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("jwt")
                        },
                        body: JSON.stringify({
                            pic: data.url
                        })
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
                            dispatch({ type: "UPDATEPROFILE", payload: result.pic })
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [image])

    const updatePhoto = (file) => {
        setImage(file)

    }

    return (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src={state ? state.pic : "loading"}
                            alt="profile"
                        />
                    </div>
                    <div>
                        <h4>{state ? state.name : "loading"}</h4>
                        <h5>{state ? state.email : "loading"}</h5>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                            <h5>{myPics.length} Posts</h5>
                            <h5>{state ? state.followers.length : "0"} Followers</h5>
                            <h5>{state ? state.following.length : "0"} Following</h5>
                        </div>
                    </div>
                </div>
                <div className="file-field input-field" style={{ margin: "20px" }}>
                    <div className="btn #64b5f6 blue lighten-2">
                        <span>Upload profile</span>
                        <input type="file"
                            onChange={(e) => updatePhoto(e.target.files[0])}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input type="text" className="file-path validate" />
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    myPics.map(item => {
                        return (
                            <img className="item" key={item._id} src={item.photo} alt={item.title}></img>
                        )

                    })
                }
            </div>
        </div>
    )
}

export default Profile