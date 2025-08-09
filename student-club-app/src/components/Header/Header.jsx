
import "./Header.css"; // Assuming you have a CSS file for styling
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

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
        <button>sign in</button>
      </div>
    </header>
  );
}
