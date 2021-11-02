import { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import UsersList from './UsersList';
import axios from "axios";


function FormAdd() {
    const {setUsers}=useContext(UserContext)
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [responseMsg, setResponseMsg] = useState(null);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    async function onSubmit(e) {
        e.preventDefault();
        setResponseMsg(null);
        if (data.name !== '' && data.email !== '' && data.phone !== '') {
            if (/^[A-Za-z]+$/.test('' + data.name) && /^[0-9]+$/.test('' + data.phone)) {
                try {
                    const response = await axios.post("http://localhost:5000", data);
                    if (response.status === 201) {

                        setUsers((users) => {
                            return [
                                ...users,
                                response.data.user
                            ]
                        });
                        setResponseMsg({
                            status: "success",
                            message: response.data.message,
                        })
                        setTimeout(() => {
                            setResponseMsg({
                                status: "",
                                message: "",
                            })
                        }, 3000)
                        setData({
                            name: "",
                            email: "",
                            phone: ""
                        })
                    }
                } catch (e) {
                    setResponseMsg({
                        status: "fail",
                        message: e.response.data.message
                    });
                    console.log(e);
                }
            }else {
                alert('Invalid name or phone')
            }
        }
    }
    return (
            <div className='form'>
                <form onSubmit={onSubmit}>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type='text'
                        name='name'
                        value={data.name}
                        onChange={handleChange}
                    />
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                    />
                    <label htmlFor='phone'>Phone:</label>
                    <input
                        type='text'
                        name='phone'
                        value={data.phone}
                        onChange={handleChange}
                    />
                    {
                        responseMsg && <span className={responseMsg.status}>
                            {responseMsg.message}
                        </span>
                    }
                    <button type='submit'>Add user</button>
                </form>

                <div className='user-list'>
                    <UsersList />
                </div>
            </div>
    )
}

export default FormAdd;