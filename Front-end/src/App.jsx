import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import Login from "./components/Login";
import DashBoard from "./Pages/DashBoard";
import Post from "./Pages/Post";
import ClubJoin from "./Pages/ClubJoin";
import PostCreate from "./Components/PostCreate";
import Settings from "./Pages/Settings";
import ClubMember from "./Pages/ClubMember";
import MyClubs from "./Pages/MyClubs";


// 1. Import the component

function App() {
  return (
    <BrowserRouter>
  
        <ToastContainer/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={ <DashBoard /> } />
          <Route path="/post" element={ <Post /> } />
          <Route path="/postcreate" element={ <PostCreate /> }/>
          <Route path="/club/:clubId" element={<ClubJoin/>}/>
          <Route path="clubmember/:clubId" element={<ClubMember/>}/>
          <Route path="/myclubs" element={<MyClubs/>}/>
          <Route path="/settings" element={<Settings/>}/>
        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
