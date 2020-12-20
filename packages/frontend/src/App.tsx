import React from "react";
import "./App.css";
import { ShortenerPanel } from "./Shortener/ShortenerPanel";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ShortenerPanel />
      </header>
    </div>
  );
}

export default App;
