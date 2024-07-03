import style from "./Matrix.module.css";

function Matrix(props) {
    const rowCount = props.Matrix.length;
    const colCount = props.Matrix[0].length;

    return (
        <div className={style.main}>
            <div className={style.title}>
                Матрица достижимости
            </div>
            <div className={style.matrixArea}>
                {/* Column Numbers */}
                <div className={style.colNumber}></div>
                {Array.from({ length: colCount }).map((_, colIndex) => (
                    <div key={colIndex} className={style.colNumber}>{colIndex}</div>
                ))}

                {props.Matrix.map((row, rowIndex) => (
                    <div key={rowIndex} className={style.matrixString}>
                        {/* Row Number */}
                        <div className={style.rowNumber}>{rowIndex}</div>
                        {row.map((unit, colIndex) => (
                            <div key={colIndex} className={style.matrixUnit} data-value={unit}>
                                {unit}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Matrix;
