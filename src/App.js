import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Menuroutes from "./components/Menuroutes";

function App() {
  return (
    <Router>  {/* ✅ Wrap Menuroutes with BrowserRouter */}
      <Menuroutes />
    </Router>
  );
}

export default App;
