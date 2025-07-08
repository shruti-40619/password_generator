import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const[length,setlength] = useState(8);
  const[numberAllowed, setNumberAllowed] = useState(false);
  const[characterAllowed, setCharAllowed] = useState(false);
  const[password, setPassword] = useState(null);
  const passwordRef= useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+= "0123456789"
    if(characterAllowed) str+= "!@#$%^&*_+-={}[]~`"

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length,numberAllowed, characterAllowed, passwordGenerator])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  return (
    <div>
      <div className='flex-col max-w-5xl bg-gray-700 mt-7 ml-20 rounded-2xl'>
        <div>
         <h1 className='text-2xl font-bold text-white text-center'>Password Generator</h1>
        </div>
        <div className='flex m-7'>
           <input
             type="text" 
             value={password}
             className="outline-none w-full py-1 pr-3 bg-white"
             placeholder="password"
             readOnly
             ref={passwordRef}
           /> 
            <button className='bg-blue-800 text-white font-bold p-2' onClick={copyPasswordToClipboard}>copy</button>         
        </div>
        <div>
          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer ml-4'
          onChange={(e) => {
            setlength(e.target.value)
          }} /> <label className='m-4'> Length: {length}</label>

          <input
           type="checkbox"
           defaultChecked={numberAllowed} 
           id="numberInput"
           onChange={() => {
            setNumberAllowed((prev) => !prev);
           }}/> <label htmlFor="numberInput">Numbers</label>

           <input
           type="checkbox"
           defaultChecked={characterAllowed} 
           id="charInput"
           className='m-2'
           onChange={() => {
            setCharAllowed((prev) => !prev);
           }}/> <label htmlFor="charInput">Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
