import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Map from "./components/Map";
import About from "./components/About";
import Neighbourhood from "./components/Neighbourhood";
import Sellproperty from "./components/Sellproperty";
import Lens2Nest from "./components/Lens2Nest";
import Properties from "./components/Properties"; // ✅ Corrected the import path
import Developers from "./components/Developers";
import Visual from "./components/Visual";
import Doc from "./components/Doc";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/about" element={<About />} />
        <Route path="/neighbourhood" element={<Neighbourhood />} />
        <Route path="/sellproperty" element={<Sellproperty />} />
        <Route path="/Lens2Nest" element={<Lens2Nest />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/Developers" element={<Developers />} />
        <Route path="/Visual" element={<Visual />} />
        <Route path="/Doc" element={<Doc />} />
      </Routes>
    </Router>
  );
}

