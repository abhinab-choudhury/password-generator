import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  let [passwordLength, setPasswordlength] = useState(8)
  let [containsUppercase, setContainsUppercase] = useState(false)
  let [containsNumber, setContainsNumbers] = useState(false)
  let [containsSpecialCharacters, setContainsSpecialCharacters] = useState(false)
  let [password, setPassword] = useState("")
  let passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let characters = "qwertyuiopasdfghjklzxcvbnm"
    let uppercase = "QWERTYUIOPASDFGHJKLZXCVBNM"
    let specialCharacter = "~!@#$%^&*(){}[]:;|,<>.?_+="
    let num = "1234567890"

    if (containsUppercase) {
      characters += uppercase
    }
    if (containsSpecialCharacters) {
      characters += specialCharacter
    }
    if (containsNumber) {
      characters += num
    }

    let pass = "";

    for (let i = 0; i < passwordLength; i++) {
      let idx = Math.floor(Math.random() * characters.length)
      pass += characters[idx]
    }
    setPassword(pass)
  }, [passwordLength, containsUppercase, containsSpecialCharacters, containsNumber])

  useEffect(() => {
    generatePassword()
  }, [passwordLength, containsUppercase, containsSpecialCharacters, containsNumber])



  const copyHandler = (event) => {
    event.preventDefault()
    let text = document.querySelector('#password').value;
    navigator.clipboard.writeText(text)

    passwordRef.current?.select()
  }

  return (
    <>
      <div className='main'>
        <div className='w-full'>
          <div className='flex align-middle justify-center h-16'>
            <img className='object-contain mx-3' width="50" height="50" src="https://img.icons8.com/ios/50/re-enter-pincode.png" alt="re-enter-pincode" />
            <p className='text-3xl font-bold'>
              Password Generator
            </p>
          </div>
          <form className='mt-8'>
            <div className='flex place-content-center mx-5'>
              <input ref={passwordRef} id="password" type='text' className='h-16 w-80 rounded-s border-2 border-black rounded overflow-hidden px-4' value={password} readOnly />
              <button onClick={copyHandler} className='hover:bg-black hover:text-white mx-1 px-1 py-1 h-16 w-16 font-bold rounded border-black border mt-auto mb-auto'>Copy</button>
            </div>
            <div className='flex justify-center mx-auto my-auto'>
              <div className='block m-8'>
                <input className='ml-3 mr-1 size-5 align-middle' type='checkbox' name='uppercase' onChange={() => { setContainsUppercase((prev) => !prev) }} />
                <label className='size-5' htmlFor='uppercase'>[A - Z]</label>

                <input className='ml-3 mr-1 size-5 align-middle' type='checkbox' name='number' onChange={() => { setContainsNumbers((prev) => !prev) }} />
                <label className='size-5' htmlFor='number'>[0 - 9]</label>

                <input className='ml-3 mr-1 size-5 align-middle' type='checkbox' name='special-character' onChange={() => { setContainsSpecialCharacters((prev) => !prev) }} />
                <label className='size-5' htmlFor='special-character'>special-character</label>

                <br />

                <input className='ml-3 mr-1 size-5 align-middle w-64' value={passwordLength} onChange={(e) => setPasswordlength(e.target.value)} type='range' min="4" max="32" step="1" name='length' list='values' />
                <datalist id='values'>
                  <option className='p-0 size-5' value='5' label='5'></option>
                  <option className='p-0 size-5' value='8' label='8'></option>
                  <option className='p-0 size-5' value='16' label='16'></option>
                  <option className='p-0 size-5' value='32' label='32'></option>
                </datalist>

                <p className='mx-4'>
                  <b>Lenght of password : {passwordLength}</b>
                </p>
              </div>
            </div>
          </form >
          <div className='flex align-middle justify-center'>
            <div className='flex justify-around'>

              <div className='flex w-full justify-center align-middle m-3'>
                <a href='https://github.com/abhinab-choudhury/'>
                  <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/github.png" alt="github" />
                </a>
              </div>
              <div className='flex w-full justify-center align-middle m-3'>
                <a href='https://www.linkedin.com/in/abhinab-choudhury-18022822b/'>
                  <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/linkedin.png" alt="linkedin" />
                </a>
              </div>
              <div className='flex w-full justify-center align-middle m-3'>
                <a href='https://www.instagram.com/_abhinab_choudhury_/'>
                  <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/instagram-new--v1.png" alt="instagram-new--v1" />
                </a>
              </div>
            </div>
          </div >

        </div>

      </div>
    </>
  )
}

export default App
