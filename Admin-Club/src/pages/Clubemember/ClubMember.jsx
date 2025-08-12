import React from "react";
import "./Clubmember.css";
import SideBar from "../../components/SideBar/SideBar";

export default function ClubMember() {
  return (
    <div className="clubmember">
        <SideBar/>
      <div className="clubmember-content">
        <h1>Club Members</h1>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Roll No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>101</td>
              <td>John Doe</td>
              <td>john@gmail.com</td>
              <td className="status accept">Accept</td>
            </tr>
            <tr>
              <td>2</td>
              <td>102</td>
              <td>Jane Smith</td>
              <td>jane@gmail.com</td>
              <td className="status leave">Leave</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
