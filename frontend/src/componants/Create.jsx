import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState(0)
    const [error, setError] = useState("");
    console.log(name, email, age);
    const navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, age);
        const addUser = { name, email, age }
        const response = await fetch("http://localhost:4000", {
            method: "POST",
            body: JSON.stringify(addUser),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (!response.ok) {
            console.log(result.error);
            setError(result.error)
        }
        if (response.ok) {
            console.log(result);
            setError("");
            setName("");
            setEmail("");
            setAge("");
            navigate("/all");
        }
    }
    return (
        <div className='container my-2'>
            {error && <div class="alert alert-danger" >
                {error}
            </div>}
            <h2 className='text-center'>Enter the data</h2>

            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Create
