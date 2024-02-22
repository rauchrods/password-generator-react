import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      chars += "0123456789";
    }

    if (charAllowed) {
      chars += "!#$%&'()*+,-./@";
    }

    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  function copyToClipboard() {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }

  const passwordRef = useRef();

  return (
    <div className="backdrop">
      <h1>Password Generator</h1>
      <div className="display-sec">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyToClipboard}>Copy</button>
      </div>
      <div className="filters-sec">
        <div>
          <input
            type="range"
            name="length"
            id="pass-range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="pass-range">Length {length}</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="numberAllowed"
            id="numberAllowed"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberAllowed">
            Include Numbers: {numberAllowed ? "Yes" : "No"}
          </label>
        </div>

        <div>
          <input
            type="checkbox"
            name="charAllowed"
            id="charAllowed"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charAllowed">
            Include Characters: {charAllowed ? "Yes" : "No"}
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
