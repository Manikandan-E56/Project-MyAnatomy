import React from "react";
import Header from "../../components/Header/Header";
import "./DashBoard.css";

export default function DashBoard() {
  return (
    <div className="hmain">
      <Header />
      <div className="home">
        <div className="dimage">
          <div className="slideshow-filmstrip">
            <img src="dashbg.png" alt="Student life" />
            <img src="dashbg2.png" alt="Campus event" />
            <img src="dashbg3.png" alt="Club activity" />
            <img src="dashbg4.png" alt="Graduation" />

            <img src="dashbg.png" alt="Student life" />
          </div>
        </div>

        <div className="header_text">
          <h1>
            <span>Discover Amazing </span> Student Clubs
          </h1>

          <p>
            Committed to clear communication, transparent leadership, and
            sustainable growth
          </p>
        </div>
      </div>
      <div className="activits">
        <div className="activity-list">
          <div className="activity-item">Club Meetings</div>
          <div className="activity-item">Workshops</div>
          <div className="activity-item">Events</div>
          <div className="activity-item">Networking</div>
        </div>
      </div>
    </div>
  );
}
