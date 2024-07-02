
import { useState } from 'react';
import './App.css';
import CodeInput from './components/CodeInput';
import Graph from './components/Graph';
import Matrix from './components/Matrix';



function App() {
  
  const {graph, setGraph} = useState(null);
  const {matrix, setMatrix} = useState(null);

  function multyToSingleLine(multyline) {
      let singleline = multyline;

      return singleline;
  }
  
  async function getGraph(code) {
    let result = await fetch("http://localhost:5113/api/graph", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Code: code })
    });

    if (result.ok) {
      return await result.json();
    } else {
      console.log("faild to fetch graph");
      return null;
    }
  }
  
  async function AnlzBtnClick(code) {
    setGraph(await getGraph(code));
  }

  return (
    <div className="App">
      <CodeInput AnlzBtnClick={AnlzBtnClick}/>
      {graph ? <Graph Graph={graph}/> : <></>}
      {/* 
      <Graph/>
      {matrix ? <Matrix Matrix={matrix}/> : <></>} */}
    </div>
  );
}

export default App;
