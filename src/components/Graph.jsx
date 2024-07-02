import { useState } from "react"

function Graph(props) {

    const {graph, setGraph} = useState(props.Graph);

    return (
        <div>
            {graph}
        </div>
    )
}

export default Graph;