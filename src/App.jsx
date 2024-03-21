import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  let [passwordLength, setPasswordlength] = useState(8)
  let [strength, setStrength] = useState("Strong")
  let [containsUppercase, setContainsUppercase] = useState(false)
  let [containsNumber, setContainsNumbers] = useState(false)
  let [containsSpecialCharacters, setContainsSpecialCharacters] = useState(false)
  let [password, setPassword] = useState("")
  let passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let characters = "qwertyuiopasdfghjklzxcvbnm"
    let uppercase = "QWERTYUIOPASDFGHJKLZXCVBNM"
    let specialCharacter = "!@#$%^&*?_~<>(){}[]|+-"
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

    let passordStrength = () => {
      let score = 0;
      let basescore = 0;
      const minbaseLength = 8;

      let count = {
        excess: 0,
        uppercase: 0,
        specialcharacter: 0,
        numbers: 0,
      }

      let points = {
        extra: 3,
        uppercase: 4,
        numbers: 5,
        specialcharacter: 5,
        combo: 0,
        onlyNumber: 0,
        onlyLowercase: 0,
        unique: 0,
        repetation: 0
      }

      if (pass.length >= minbaseLength) {
        basescore = 50;

        // Calculating password passord Strength 
        for (let i = 0; i < pass.length; i++) {
          // count uppercase characters
          if (uppercase.includes(pass.charAt(i))) {
            count.uppercase++;
          }
          // count numbers
          if (num.includes(pass.charAt(i))) {
            count.numbers++;
          }
          // count specialcharacter
          if (specialCharacter.includes(pass.charAt(i))) {
            count.specialcharacter++;
          }
        }
        // bouns for extralength 
        count.excess = pass.length - minbaseLength;

        // bouns for password including numbers uppercase and specialcharacter : +25
        if (count.numbers && count.uppercase && count.specialcharacter) {
          points.combo = 25;
        }

        // penalty for onlyNumber in a password = -35
        let flag = true;
        for (let i = 0; i < pass.length; i++) {
          if (!num.includes(pass.charAt(i))) {
            flag = false;
            break;
          }
        }
        if (flag) {
          points.onlyNumber = -35;
        }

        // penalty for onlyLowercase in a password = -15
        flag = true;
        for (let i = 0; i < pass.length; i++) {
          if (!characters.includes(pass.charAt(i))) {
            flag = false;
            break;
          }
        }
        if (flag) {
          points.onlyLowercase = -15;
        }

        // penalty for repeating same sequence
        let countUniqueCharacters = new Set(pass.toLowerCase()).size;

        if (countUniqueCharacters <= 4) {
          points.unique = -100;
        }

        // penalty for repeated pattern
        if (/([a-z0-9]{3,})\1/.test(pass)) {
          points.repetation = -50;
        }

      } else {
        basescore = 0;
      }

      // Calculating score
      score = basescore + (count.uppercase * points.uppercase) + (count.numbers * points.numbers) + (count.specialcharacter * points.specialcharacter) + (count.excess * points.extra) + points.combo + points.repetation + points.unique + points.onlyNumber + points.onlyLowercase;

      // Updated the password Strength
      if (pass == "") {
        setStrength("Very Very Weak!!!")
      } else if (pass.length < minbaseLength) {
        setStrength("Very Weak")
      } else if (score < 50) {
        setStrength("Weak")
      } else if (score >= 50 && score < 75) {
        setStrength("Average")
      } else if (score > 75 && score < 100) {
        setStrength("Strong")
      } else if (score >= 100) {
        setStrength("Very Strong")
      }
    }

    setStrength(passordStrength)

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
            <p className='flex text-3xl mobile:text-2xl font-bold'>
              Password Generator
            </p>
          </div>
          <form className='mt-8'>
            <div className='flex place-content-center mx-5'>
              <input ref={passwordRef} id="password" type='text' className='h-16 w-80 rounded-s border-2 border-black rounded overflow-hidden px-4' value={password} readOnly />
              <button onClick={copyHandler} className='hover:bg-black hover:text-white mx-1 px-1 py-1 h-16 w-16 font-bold rounded border-black border mt-auto mb-auto'>Copy</button>
            </div>
            <div className='flex my-2 justify-center items-center'>
              <div className='my-2'>
                <span className='font-extrabold text-xl'>Password Strength : </span>
                <span className='w-fit bg-green-500 border border-green-400 text-gray-50 font-bold mx-1 text-xl px-2 py-1 rounded'>
                  {strength}
                </span>
              </div>
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

        </div >

      </div >
    </>
  )
}

export default App
