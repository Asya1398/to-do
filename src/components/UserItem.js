import { MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { NavLink,useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import axios from "axios";



function UserItem({ user }) {
    const {users, setUsers} = useContext(UserContext);
    let history = useHistory();

   async function removeUser(id) {
        try {
            const response = await axios.post(`http://localhost:5000/delete/${id}`);
            if(response){
                setUsers(users.filter((t) => t.id !== id));
                history.push("/");
            }
        }catch (e){
            console.log(e);
        }
    }

    return (
        <div id="user">
            <span> {user.name}</span>
            <span> {user.email}</span>
            <span> {user.phone}</span>
            <NavLink to={`/delete/${user.id}`}>
            <button className="del"
                    onClick={() => removeUser(user.id)}>
                <MdDelete/>
            </button>
            </NavLink>
            <NavLink to={`/edit/${user.id}`}>
                <button className="edit">
                    <AiFillEdit/>
                </button>
            </NavLink>
        </div>
    )
}

export default UserItem