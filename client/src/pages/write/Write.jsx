import './write.css' 
import { useContext, useState} from "react"
import axios from "axios"
import {Context} from "../../context/Context"
export default function Write() {
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [categories, setCategories] = useState([])
  const[file,setFile] = useState(null)
 const {user} = useContext (Context)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username : user.username,
      title, 
      desc,
      categories,
      
    };
    if(file)
    {
      const data =new FormData();
      const filename = Date.now()+file.name;
      data.append("name",filename);
      data.append("file",file);
      newPost.photo = filename;
      try{
        await axios.post("/upload", data);
      }catch(err)
      {

      }
    }
    try{
     const res = await axios.post("/posts", newPost);
     window.location.replace("/post/"+res.data._id);
    }
    catch(err)
    {

    }
  };
  return (
    <div className='write'>
      {file && (
        <img className='writeImg' 
        src= {URL.createObjectURL(file)}
        alt=""/>)}
      <form className='writeForm' onSubmit={handleSubmit}>
        <div className='writeFormGroup'>
            <label htmlFor='fileInput'>
            <i className="writeIcon fa-solid fa-plus"></i> 
            </label>
            <input type='file' id='fileInput' style={{display:"none"}}
            onChange={(e=> setFile(e.target.files[0]))}/>
            <input type='text' placeholder='Title'  className='writeInput' autofocus={true}
            onChange={(e=>setTitle(e.target.value))}
            />

        </div>
        <div className ="item">
          <h1>Choose Branch</h1>
          <input type="radio" name="cat" value="Computer Science Engineering" id="computer" />
          <label htmlFor="computer">Computer Science and Engineering</label>
          <input type="radio" name="cat" value="Elecctronics and Communication" id="electronics" />
          <label htmlFor="electronics">Electronics and Communication</label>
          <input type="radio" name="cat" value="Electrical Engineering" id="electrical" />
          <label htmlFor="electrical">Electrical Engineering</label>
          <input type="radio" name="cat" value="Mechanical Engineering" id="mechanical" />
          <label htmlFor="mechanical">Mechanical Engineering</label>
          <input type="radio" name="cat" value="Civil Engineering" id="civil" />
          <label htmlFor="civil">Civil Engineering</label>
          <input type="radio" name="cat" value="Chemical Engineering" id="chemical" />
          <label htmlFor="chemical">Chemical Engineering</label>
          </div>
        <div className="writeFormGroup">
            <textarea placeholder='Tell your story...' type="text"
            className='writeInput writeText'
            onChange ={(e=>setDesc(e.target.value))}
            >

            </textarea>
        </div>
        
        <button className="writeSubmit" type="submit">Publish</button>
      </form>
    </div>
  )
}
 