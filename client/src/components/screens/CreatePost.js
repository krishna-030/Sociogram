import { useState, useEffect } from "react"
import M from 'materialize-css'
import { useHistory } from "react-router"

const CreatePost = () => {

    const history=useHistory()
    const [title,setTitle]=useState('')
    const [body,setBody]=useState('')
    const [image,setImage]=useState('')
    const [url,setUrl]=useState('')

    useEffect(()=>{
        if(url){

            fetch("http://localhost:5000/post",{
            method : "post",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")    
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({html : data.error, classes: "#d50000 red accent-4"})
            }
            else{
                M.toast({html : "Created post successfully", classes:"#4caf50 green"})
                history.push('/')
            }
        })
        .catch(err=>{
            console.log(err)
        })

        }
    },[url,body,history,title])

    const postDetails = ()=>{
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

    return(


        <div className="card input-field" style={{
            margin : "10px auto",
            maxWidth : "500px",
            padding : "20px",
            textAlign : "center"

        }}>
            <input 
                type="text" 
                placeholder="Title" 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
            <input 
                type="text" 
                placeholder="Body" 
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue lighten-2">
                    <span>Choose photo</span>
                    <input type="file" 
                    onChange={(e)=>setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input type="text" className="file-path validate" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 post-btn"
            onClick={()=>postDetails()} 
            >Post</button>
        </div>
    )
}

export default CreatePost