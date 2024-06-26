import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./components/Index";
import BranchDetail from "./components/BranchDetail";

function App() {
  return (
    <div className="w-full h-[400px]">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="api/:bankCode/:branchCode/:branchName"
            element={<BranchDetail />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
