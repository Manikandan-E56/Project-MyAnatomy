import React from "react";
import "./Posts.css";
import SideBar from "../../components/SideBar/SideBar";

export default function Posts() {
  // Example post data
  const posts = [
    {
      id: 1,
      title: "Annual Cultural Fest Announcement",
      description:
        "We are excited to announce the Annual Cultural Fest for our college! Join us for music, dance, and fun events.",
      coordinator: {
        name: "Dr. Suresh Kumar",
        email: "suresh.kumar@college.edu",
        phone: "9876543210",
      },
      date: "2025-08-10",
    },
    {
      id: 2,
      title: "Photography Workshop",
      description:
        "Join our Photography Workshop to learn techniques from experts and participate in a campus-wide competition.",
      coordinator: {
        name: "Prof. Anita Rao",
        email: "anita.rao@college.edu",
        phone: "9876543211",
      },
      date: "2025-08-05",
    },
    {
      id: 2,
      title: "Photography Workshop",
      description:
        "Join our Photography Workshop to learn techniques from experts and participate in a campus-wide competition.",
      coordinator: {
        name: "Prof. Anita Rao",
        email: "anita.rao@college.edu",
        phone: "9876543211",
      },
      date: "2025-08-05",
    },
    {
      id: 2,
      title: "Photography Workshop",
      description:
        "Join our Photography Workshop to learn techniques from experts and participate in a campus-wide competition.",
      coordinator: {
        name: "Prof. Anita Rao",
        email: "anita.rao@college.edu",
        phone: "9876543211",
      },
      date: "2025-08-05",
    },
    {
      id: 2,
      title: "Photography Workshop",
      description:
        "Join our Photography Workshop to learn techniques from experts and participate in a campus-wide competition.",
      coordinator: {
        name: "Prof. Anita Rao",
        email: "anita.rao@college.edu",
        phone: "9876543211",
      },
      date: "2025-08-05",
    },
  ];

  return (
    <div className="post">
      <SideBar />
      <div className="postContainer">
        <h1>Posts</h1>
        <p>Here you can see all club posts.</p>

        <div className="postList">
          {posts.map((post) => (
            <div key={post.id} className="postCard">
              <h2>{post.title}</h2>
              <p className="date">📅 {post.date}</p>
              <p className="description">{post.description}</p>
              <div className="coordinator">
                <p><strong>Coordinator:</strong> {post.coordinator.name}</p>
                <p>Email: {post.coordinator.email}</p>
                <p>Phone: {post.coordinator.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
