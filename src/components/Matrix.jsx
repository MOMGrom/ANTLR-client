import style from "./Matrix.module.css";

function Matrix(props) {

    return (
        <div className={style.main}>
            <div className={style.title}>
                Матрица достижимости
            </div>
            <div className={style.matrixArea}>
                {props.Matrix.map((string, index) => {
                    return (
                        <div key={index} className={style.matrixString}>
                            {string.map((unit, index) => {
                                return (
                                    <div key={index} className={style.matrixUnit}>{unit}</div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Matrix;