import { UserContext } from './UserContext';
import { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import axios from "axios";

function FormEdit() {
    const params = useParams();
    const history = useHistory();
    const {users, setUsers} = useContext(UserContext);
    const [editUser, setEditUser] = useState({});

    useEffect(()=>{
        axios.get(`http://localhost:5000/edit/${params.id}`).then((response)=>{
            if(response.data){
                setEditUser(response.data)
            }else{
                history.push('/');
            }

        })
    },[params.id, users]);

    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');

    const editName = (e) => {
        setNewName(e.target.value);
    };
    const editEmail = (e) => {
        setNewEmail(e.target.value);
    };
    const editPhone = (e) => {
        setNewPhone(e.target.value);
    };
    useEffect(() => {
        setNewName(editUser.name);
        setNewEmail(editUser.email);
        setNewPhone(editUser.phone);
    }, [editUser])



    function addEditedUser(id, name, email, phone) {
        setUsers(users.map(user => {
            if (user.id === id) {
                return { ...user,  name, email, phone }
            }
            return user;
        }))
        history.push('/');
    }

  async  function userEdit(e) {
        e.preventDefault();
        if (newName !== '' && newEmail !== '' && newPhone !== '') {
            try {
                const response = await axios.put("http://localhost:5000/edit", {
                    id: editUser.id,
                    name: newName,
                    email: newEmail,
                    phone: newPhone,
                });
                if(response.status === 200){
                    addEditedUser(editUser.id, newName, newEmail, newPhone);
                }
           }
            catch (e) {
                console.log(e)
            }
        }
    }


    return (
        <div className='form'>
            <form>
                <label htmlFor='name'>Name:</label>
                <input type='text'
                       name='name'
                       defaultValue={editUser.name}
                       onChange={ editName }/>
                <label htmlFor='email'>Email:</label>
                <input type='email'
                       name='email'
                       defaultValue={editUser.email}
                       onChange={ editEmail }/>
                <label htmlFor='phone'>Phone:</label>
                <input type='text'
                       name='phone'
                       defaultValue={editUser.phone}
                       onChange={ editPhone }/>
                <div className="editBtn">
                    <NavLink to={`/update/${editUser.id}`}>
                        <button className='submit' onClick={ userEdit }>Submit</button>
                    </NavLink>
                    <NavLink to='/'>
                        <button>Cancel</button>
                    </NavLink>
                </div>
            </form>
        </div>
    )
}

export default FormEdit