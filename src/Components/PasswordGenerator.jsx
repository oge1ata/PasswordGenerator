 import React, { useEffect, useState } from 'react'
 import './PasswordGenerator.css'
 import copyIcon from '../Assets/icons8-copy-24.png'
 import { ToastContainer, toast } from 'react-toastify';


 const lowerCaseList = 'abcdefghijklmnopqrstuvwxyz';
 const upperCaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 const numbersList = '0123456789';
 const symbolsList = '!@#$&*()?'
 
 
 function PasswordGenerator() {
    const [password, setPassword] = useState('');
    const [lowerCase, setLowerCase] = useState(true);
    const [upperCase, setUpperCase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbol, setSymbol] = useState(true);
    const [passwordLength, setPasswordLength] = useState(8);
    const [selectedChoices, setSelectedChoices] = useState(['lowercase', 'uppercase', 'numbers', 'symbol'])

    useEffect(() => {
        generatePassword();
    }, [passwordLength])

    const handleCheckbox = (type) => {
        let tempChoices = selectedChoices;
        if (tempChoices.includes(type)){
            const index = tempChoices.indexOf(type);
            tempChoices.splice(index, 1);
        }
        else{
            tempChoices.push(type);
        }
        console.log(tempChoices);
        setSelectedChoices(tempChoices);

    }

    const generatePassword = () => {
        let characterList = '';

        if (lowerCase){
            characterList += lowerCaseList
        }

        if (upperCase){
            characterList += upperCaseList
        }

        if (numbers){
            characterList += numbersList
        }

        if (symbol){
            characterList += symbolsList
        }

        // console.log(characterList);
        let tempPassword = '';
        const characterListLength = characterList.length;

        for(let i = 0; i < passwordLength; i++){
            const characterIndex = Math.round(Math.random() * characterListLength);
            tempPassword += characterList.charAt(characterIndex);
        }

        setPassword(tempPassword);
    }

    const copyPassword = async () => {
        const copiedText = await navigator.clipboard.readText();
        if (password.length && copiedText != password) {
            navigator.clipboard.writeText(password);
            toast.success('Password Copied!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }

    return (
    <>
     <div className='container'>
        <h2 className='title'> Strong Password Generator</h2>
        <div className="password-wrapper">
            <div className="password-area">
                <div className="password">
                    <input type="text" value={password} disabled placeholder='Click on the generate password button'/>
                    <img src={copyIcon} alt="copy icon" onClick={copyPassword} className='copyIcon'/>
                </div>
            </div>
        </div>
        <div className="setting">
            <h4> Customize Your Password</h4>
            <div className="customize">
                <div className="checkboxes">
                    <div className="left">
                        <div className="checkbox-field">
                            <input type="checkbox" name="lower" checked={lowerCase} id="lower" onChange={() => {setLowerCase(!lowerCase); handleCheckbox('lowercase');}}/>
                            <label htmlFor="lower">Include Lower Case</label>
                        </div>
                        <div className="checkbox-field">
                            <input type="checkbox" name="upper" checked={upperCase} id="upper" onChange={() => {setUpperCase(!upperCase); handleCheckbox('uppercase');}}/>
                            <label htmlFor="upper">Include Upper Case</label>
                        </div>
                    </div>
                    <div className="right">
                        <div className="checkbox-field">
                            <input type="checkbox" name="numbers" checked={numbers} id="numbers" onChange={() => {setNumbers(!numbers); handleCheckbox('numbers');}}/>
                            <label htmlFor="numbers">Include Numbers (0-9)</label>
                        </div>
                        <div className="checkbox-field">
                            <input type="checkbox" name="symbols" checked={symbol} id="symbols" onChange={() => {setSymbol(!symbol); handleCheckbox('symbol');}}/>
                            <label htmlFor="symbols">Include Symbols (&-#)</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="password-length">
            <h4> Password Length</h4>
            <div className="slider">
                <p className="rangeValue">{passwordLength}</p>
                <div className="range">
                    <input type="range" min={10} max={40} defaultValue={passwordLength} onChange={(event) => setPasswordLength(event.currentTarget.value)}/>
                </div>
            </div>
        </div>
        <div className="buttons">
            <button type="button" onClick={copyPassword}>Copy Password</button>
            <button type="button" onClick={generatePassword}>Generate Password</button>
        </div>
     </div>
     <ToastContainer />
     </>
   )
 }
 
 export default PasswordGenerator