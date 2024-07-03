import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp'; // Поддержка языка C
import 'ace-builds/src-noconflict/theme-monokai'; // Тема редактора
import styles from './CodeInput.module.css';

const CodeInput = (props) => {
  const [code, setCode] = useState('');

  const handleChange = (newCode) => {
    setCode(newCode);
  };

  async function handleClick(event) {
    event.preventDefault();
    await props.AnlzBtnClick(code);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Вставьте ваш код на языке C:</h1>
      <AceEditor
        mode="c_cpp"
        theme="monokai"
        name="codeEditor"
        className={styles.editor}
        value={code}
        onChange={handleChange}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          fontSize: 18,
        }}
        height="700px"  
        width="1500px"
      />
      <button className={styles.button} onClick={handleClick}>Анализировать</button>
    </div>
  );
};

export default CodeInput;
