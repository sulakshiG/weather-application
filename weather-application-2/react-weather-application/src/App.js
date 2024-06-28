import './App.css';
import Header from './components/Header/Header.js';
// import Footer from './components/Footer/Footer.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import ViewWeather from "./pages/ViewWeather.js";
import Footer from './components/Footer/Footer.js';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/city/:cityCode" element={<ViewWeather />} />
        </Routes>
      </BrowserRouter>
      <Footer />

    </div>
  );
}

export default App;
