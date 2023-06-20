import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [quote, setQuote] = useState(null);
  const [initFlg, setInitFlg] = useState(false);
  const url = 'https://api.qwer.pw/request/helpful_text?apikey=guest';

  async function fecthData() {
    let res = await fetch(url);
    let json = await res.json();
    setQuote(JSON.stringify(json[1].respond));
  }

  useEffect(() => {
    if(!initFlg) {
      fecthData();
      setInitFlg(!initFlg);
    }
    let quoteCall = setInterval(()=> {
      fecthData();
    }, 5000)
    
    return () => clearInterval(quoteCall);
  }, [quote]);

  const d = new Date();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const day = d.getDay();
  const dayList = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  return (
      <div className='App'>
        <p className='quote'>{quote ? quote : null}</p>
        <div className="dateBox">
          <div className="info">
            <p className='day'>{dayList[day]}</p>
            <p className='date'>{month}/{date}</p>
          </div>
        </div>
        <div>
            <button>더보기</button>
        </div>
      </div>
  )
}

export default App
