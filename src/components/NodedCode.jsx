import AceEditor from 'react-ace';
import style from "./NodedCode.module.css";
import { useState } from 'react';

function NodedCode(props) {

    const [code, setCode] = useState(props.Code)

    function handleChange(event) {
        setCode(code)
    }
    return (
        <div className={style.main}>
            <AceEditor
                mode="c_cpp"
                theme='monokai'
                name='codeEditor'
                className={style.ediotr}
                value={code}
                onChange={handleChange}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    fontSize: 18,
                }}
                height='100vh'
                width='45vw'
            />
        </div>
    )
}

export default NodedCode;