import React from "react";
import "./PostCreate.css";
export default function PostCreate() {

  
  const createpost = (e) => {};


  return (
    <div className="postcreating">
      <h1>Create a New Post</h1>
      <div className="postcontent">
        <form onSubmit={createpost}>
          <label htmlFor="title">Title:</label>
          <input type="text" placeholder="Enter Title" />
          <label htmlFor="content">Description:</label>
          <textarea
            name="content"
            id="content"
            cols="40"
            placeholder="Description..."
            rows="5"
          ></textarea>

          <h2> Coordinator :</h2>
          <label htmlFor="Name">Name:</label>
          <input type="text" placeholder="Enter Staff Name" />
          <label htmlFor="Email">Email:</label>
          <input type="email" placeholder="Enter Staff Email" />
          <label htmlFor="Phone">Phone:</label>
          <input type="tel" placeholder="Enter Staff Phone" />

          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
}
