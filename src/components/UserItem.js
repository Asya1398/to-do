import { MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import axios from "axios";



function UserItem({ user }) {

    const {users, setUsers} = useContext(UserContext);

   async function removeUser(id) {
       const conf=window.confirm("are you sure to delete user?");
       if(conf){
           try {
               const response = await axios.post(`http://localhost:5000/delete/${id}`);
               if(response){
                   setUsers(users.filter((t) => t.id !== id));
               }
           }catch (e){
               console.log(e);
           }
       }

    }

    return (
        <div id="user">
            <span> {user.name}</span>
            <span> {user.email}</span>
            <span> {user.phone}</span>
                <button className="del"
                        onClick={() => removeUser(user.id)}>
                    <MdDelete/>
                </button>
            <NavLink to={`/edit/${user.id}`}>
                <button className="edit">
                    <AiFillEdit/>
                </button>
            </NavLink>
        </div>
    )
}

export default UserItem