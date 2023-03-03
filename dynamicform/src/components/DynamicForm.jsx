import React, { useEffect } from 'react'
import axios from 'axios'

function DynamicForm() {

    const fetchApi = () => {

        axios.get('https://run.mocky.io/v3/a55c4590-c635-49af-a01f-7ee2e6a85669', {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                console.log(response);
            })
            .catch((e) => {
                console.log(e.message);
            })

    }

    useEffect(() => {
        fetchApi();
    }, [])

    return (
        <div>
            <h1>DynamicForm</h1>
        </div>
    )
}

export default DynamicForm