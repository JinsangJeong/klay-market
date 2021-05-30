import './App.css';
import QRCode from 'qrcode.react';
import { readCount, getBalance } from './api/UserCaver';
import * as KlipAPI from "./api/UserKlip";
import { useState } from 'react';

function displayOnPress(b, setB) {
  setB(b);
}

const DEFAULT_QR_CODE = "DEFAULT";

function App() {

  // balance와 count를 반환받아 앱에 표시하는 기능을 구현하였습니다. 
  let _count = "0";
  let _balance = "0";

  const [balance, setBalance] = useState('0')
  const [count, setCount] = useState('0')
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

  const onClickGetBalance = async () => {
    _balance = await getBalance(); 
    console.log(_balance)
    displayOnPress(_balance, setBalance);
  }

  const onClickReadCount = async ()=> {
    _count = await readCount();
    console.log(_count)
    displayOnPress(_count, setCount);
  }

  const onClickGetAddress = () => {
    KlipAPI.getAddress(setQrvalue);
  };
  const onClickSetCount=() =>{
    KlipAPI.setCount(2000, setQrvalue);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={()=> {onClickGetBalance()}}>Balance of Account</button>
        <p>
          {balance}
        </p>
        <button onClick={()=> {onClickReadCount()}}>Counts of Account</button>
        <p>
          {count}
        </p>
        <button onClick={()=>{onClickGetAddress()}}>주소 가져오기</button>
        <br/>
        <button onClick={()=>{onClickSetCount()}}>카운트 값 변경</button>
        <br/>
        <QRCode value={qrvalue} />
      </header>
    </div>
  );
}

export default App;
