import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [characterAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*_+-={}[]~`';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, password.length);
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-poppins px-4">
      <div className="backdrop-blur-md bg-white/10 p-10 rounded-3xl shadow-2xl border border-white/20 max-w-xl w-full ">
        <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-md ">
           Password Generator
        </h1>

        <div className="flex items-center bg-white/20 rounded-xl overflow-hidden mb-6 shadow-md focus-within:ring-2 ring-white">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="flex-1 px-4 py-3 text-lg bg-transparent text-white placeholder-white/70 outline-none"
            placeholder="Click generate or adjust settings"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-white/30 hover:bg-white/40 text-white px-6 py-3 font-semibold transition-all duration-300"
          >
             Copy
          </button>
        </div>

        <div className="grid gap-5 text-white">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-lg font-medium">
              Length: {length}
            </label>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              id="length"
              className="w-2/3 accent-white"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numbers" className="text-lg font-medium">
              Include Numbers
            </label>
            <input
              type="checkbox"
              id="numbers"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="w-5 h-5 accent-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="special" className="text-lg font-medium">
              Include Special Characters
            </label>
            <input
              type="checkbox"
              id="special"
              checked={characterAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="w-5 h-5 accent-white"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={passwordGenerator}
            className="bg-white/30 hover:bg-white/50 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          >
             Regenerate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
