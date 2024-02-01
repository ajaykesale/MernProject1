import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Read = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    
    async function GetData() {
        const response = await fetch("http://localhost:4000");
        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            setError(result.error);
        }
        if (response.ok) {
            setData(result);
        }
    }
    useEffect(()=>{
        GetData();
    },[])

    //handle for delete operation
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/${id}`, {
                method: "DELETE"
            });
    
            const result = await response.json();
    
            if (!response.ok) {
                console.log(result.error);
                setError(result.error);
            }
    
            if (response.ok) {
                setError("Deleted Successfully");
                setTimeout(() => {
                    setError("");
                    GetData();
                }, 1000);
            }
        } catch (error) {
            console.error("Error during DELETE request:", error);
            // Handle the error appropriately (e.g., set an error state)
        }
    };
    

    useEffect(() => {
        GetData();
    }, []);
    console.log(data);

    return (
        <div className='container my-2 '>
            {error && <div className="alert alert-danger" >
                {error}
            </div>}
            <h2 className='text-center'>All Data</h2>
            <div className='row text-center'>
                {data?.map((ele) => (
                    <div key={ele._id} className='col-3'>
                        <div className="card" >
                            <div className="card-body ">
                                <h5 className="card-title ">{ele.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                                <h6 className="text-muted">{ele.age}</h6>
                                <a href="#" className="card-link" onClick={() => handleDelete(ele._id)}><button type="button" class="btn btn-outline-danger">Delete</button></a>
                                <Link to={`/${ele._id}`} className="card-link"><button type="button" class="btn btn-outline-warning">Edit</button></Link>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Read
