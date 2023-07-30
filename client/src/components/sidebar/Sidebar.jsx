import "./sidebar.css"
import axios from "axios"
import {Link} from "react-router-dom";
import { useEffect, useState} from "react";

export default function Sidebar(){
    const [cats, setCats] = useState([]);
    
    useEffect(()=>
    {
        const getCats = async()=>
        {
            const res = await axios.get("/categories")
            setCats(res.data)
        };
        getCats();
    },[])
    return (
        <div className ="sidebar">
           <div className ="sidebarItem">
            <span className="sidebarTitle">ABOUT US</span>
            <p>
                This website is aimed at helping students by providing them interview preparations and internship experiences of our alumni members.
            </p>
           </div>
           <div className = "sidebarItem">
            <span className="sidebarTitle">Categories</span>
            <ul className="sidebarList">
                {cats.map((c)=> (
                    <Link to={`/?cat=${c.name}`} className="link">
                  <li className="sidebarListItem">{c.name}</li>
                  </Link>
               
                ))}
               
                </ul>
           </div>
           <div className="sidebarItem"></div>
           <span className="sidebarTitle">FOLLOW US</span>
           <div className="sidebarSocial">
           <i className="sidebarIcon fab fa-facebook-square"></i>
           <i className="sidebarIcon fab fa-twitter-square"></i>
           <i className="sidebarIcon fab fa-pinterest-square"></i>
           <i className="sidebarIcon fab fa-instagram-square"></i>
        
           </div>
        </div>
    )
}