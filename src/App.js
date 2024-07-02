
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
    let result = fetch("http://localhost:5113/api/graph", {
      method: "POST",
      mode: "cors",
      headers: {
        
      },
      body: {
        code: multyToSingleLine(code),
      }
    });

    console.log((await result).body);
  }
  
  function AnlzBtnClick(code) {
    getGraph(code);
  }

  return (
    <div className="App">
      {/* <CodeInput AnlzBtnClick={AnlzBtnClick}/>
      {graph ? <Graph Graph={graph}/> : <></>}
      {matrix ? <Matrix Matrix={matrix}/> : <></>} */}
      <Graph/>
    </div>
  );
}

export default App;
