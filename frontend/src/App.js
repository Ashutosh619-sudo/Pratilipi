import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Signup from "./components/Signup/Signup";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import RequireAuth from "./components/RequiredAuth";


function App() {
  return (
    <Router>
      <Routes>
        <Route 
            path="/" 
            element={
              <RequireAuth>
                <Dashboard/>
              </RequireAuth>
            } />
        <Route path="/signUp" element={<Signup/>}/>

      </Routes>
        
        
    </Router>
  );
}

export default App;
