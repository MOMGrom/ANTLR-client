
import { useState } from 'react';
import './App.css';
import CodeInput from './components/CodeInput';
import Graph from './components/Graph';
import Matrix from './components/Matrix';
import NodedCode from './components/NodedCode';
import NewGraph from './components/NewGraph';



function App() {
  
  const [graph, setGraph] = useState(null);
  const [matrix, setMatrix] = useState(null);
  const [changeGraph, setChangeGraph] = useState(true);

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

  console.log(graph)

  return (
    <div className="App">
      <CodeInput AnlzBtnClick={AnlzBtnClick}/>

      {graph ? <div style={{
        height: "100vh",
        width: "90%",
        margin: "auto",
        alignItems: "top",

        borderStyle: "solid",
        borderColor: "rgba(65, 65, 65, 1.0)",
        borderWidth: "2px",
        borderRadius: "10px"
      }}>
        <div style={{
          display: "inline-block",
          height: "100%",
          width: "50%",
        }}>
          <NodedCode Code={graph.NodedCode}/>
        </div>
        <div style={{
          display: "inline-block",
          height: "100%",
          width: "50%",
          verticalAlign: "top"
        }}>
          <button className="button" onClick={() => setChangeGraph(!changeGraph)}>Отображение</button>
          {changeGraph ? <Graph Graph={graph}/> : <NewGraph Graph={graph}/>}
        </div>
      </div> : <></>}
      {graph ? <Matrix Matrix={graph.Matrix}/> : <></>}
    </div>
  );
}

export default App;
