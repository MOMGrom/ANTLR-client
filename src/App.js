
import { useState } from 'react';
import './App.css';
import CodeInput from './components/CodeInput';
import Graph from './components/Graph';
import Matrix from './components/Matrix';
import NodedCode from './components/NodedCode';



function App() {
  
  const [graph, setGraph] = useState(null);
  const [matrix, setMatrix] = useState(null);

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
    setGraph((JSON.parse(await getGraph(code))));
  }

  return (
    <div className="App">
      <CodeInput AnlzBtnClick={AnlzBtnClick}/>

      {graph ? <div style={{
        backgroundColor: "white",
        height: "100vh",
        width: "90%",
        margin: "auto",
        alignItems: "top"
      }}>
        <div style={{
          display: "inline-block",
          height: "100%",
          width: "50%",
          backgroundColor: "pink"
        }}>
         <div style={{
          backgroundColor: "blue",
          height: "100%",
          verticalAlign: "top"
         }}>
          <NodedCode Code={graph.Code}/>
         </div>
        </div>
        <div style={{
          display: "inline-block",
          height: "100%",
          width: "50%",
          backgroundColor: "violet",
          verticalAlign: "top"
        }}>
          <Graph Graph={graph}/>
        </div>
      </div> : <></>}
      {graph ? <Matrix Matrix={graph.Matrix}/> : <></>}
    </div>
  );
}

export default App;
