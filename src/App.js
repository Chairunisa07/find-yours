import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./navbar/navbar";
import Home from "./home/home";
import Footer from "./footer/footer";
import Job from "./job/job";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/job/:jobId" element={<Job />} />
        <Route
          path="/find-job"
          element={<Navigate to="/#find-job" replace />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
