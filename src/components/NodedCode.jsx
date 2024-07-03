import AceEditor from 'react-ace';
import style from "./NodedCode.module.css";
import { useState } from 'react';

function NodedCode(props) {

    const [code, setCode] = useState(props.Code)

    function handleChange(newCode) {

    }

    return (
        <div>
            {code}
        </div>
    )
}

export default NodedCode;