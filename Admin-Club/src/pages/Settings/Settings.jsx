import './Settings.css';
import SideBar from '../../components/SideBar/SideBar';

export default function Settings() {
 
  const adminData = {
    name: "John Doe",
    email: "admin@college.edu",
    clubName: "Tech Innovators Club",
    phone: "+91 9876543210"
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    alert("Password changed successfully!");
  };

  return (
    <div className="settings">
      <SideBar />
      <div className="settingsContainer">
        <h1>Settings</h1>

       
        <div className="profile">
          <table>
            <tbody>
              <tr>
                <td><strong>Name</strong></td>
                <td>{adminData.name}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{adminData.email}</td>
              </tr>
              <tr>
                <td><strong>Club Name</strong></td>
                <td>{adminData.clubName}</td>
              </tr>
              <tr>
                <td><strong>Phone Number</strong></td>
                <td>{adminData.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>

      
        <div className="changePassword">
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordChange}>
            <label>Current Password</label>
            <input type="password" placeholder="Enter current password" required />

            <label>New Password</label>
            <input type="password" placeholder="Enter new password" required />

            <label>Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" required />

            <button type="submit">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}
