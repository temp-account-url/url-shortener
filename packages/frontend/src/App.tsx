import React from "react";
import "./App.css";
import { ShortenerPanel } from "./Shortener/ShortenerPanel";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {window.location.pathname.indexOf("not-found") !== -1 ? (
                    <div className="App-not-found">
                        <div>Not found</div>

                        <a href="/">Go to main page</a>
                    </div>
                ) : (
                    <ShortenerPanel />
                )}
            </header>
        </div>
    );
}

export default App;
