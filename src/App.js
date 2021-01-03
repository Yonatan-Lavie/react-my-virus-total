import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { File, Url, Search, Whoops404, Test } from "./pages";
import virusTotalLogo from "./images/vt-enterprise.svg"


//API Key - 90d13ae41fb269f3d79d5f7c3372864e328254d56f69fc2caf9e13ca93d43e12


function App() {
  return (
    <div className="App">
        <header>
          <img alt="VirusTotal" src={ virusTotalLogo } />
        </header>
        
        <nav>
          <button><Link to="url">Url</Link></button>
          <button><Link to="File">File</Link></button>
          <button><Link to="Search">Search</Link></button>
          <button><Link to="test">test</Link></button>
        </nav>
        <Routes>
            <Route path="/" element={<Test />} /> 
            <Route path="/url" element={<Url />} />
            <Route path="/file" element={<File />} />
            <Route path="/search" element={<Search />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<Whoops404 />} />
        </Routes>
    </div>

  );
}

export default App;
