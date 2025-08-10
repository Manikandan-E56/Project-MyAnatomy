import React, { useContext } from "react";
import "./Header.css"; // Assuming you have a CSS file for styling
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../../Context/StudentContext";

export default function Header() {
  const navigate = useNavigate();

  const { token } = useContext(StudentContext);

  return (
    <header>
      <div className="navcontent">
        <img src="/slack.png" alt="" />
        <ul>
          <li onClick={() => navigate("/dashboard")}>Home</li>
          <li onClick={() => navigate("/clubs")}>Clubs</li>
          <li onClick={() => navigate("/posts")}>Post</li>
          <li onClick={() => navigate("/about")}>About</li>
        </ul>
        {token?<button onClick={()=>navigate('/login')}>sign in</button>:
        <div>
            <img src="user.png" alt="" className="userprofile" onClick={()=>navigate('/password')} />

        </div>}
      </div>
    </header>
  );
}
