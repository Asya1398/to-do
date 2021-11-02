import UserItem from './UserItem';
import {useContext} from 'react';
import {UserContext} from './UserContext';

function UsersList() {
    const {users}=useContext(UserContext);
    return (
        <div>
            { users.map((user) => {
                    return(
                        <div key={user.id}>
                            <UserItem user={user}/>
                        </div>
                    )
            })}
        </div>
     )
}

export default UsersList;