import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuthStore from '~/store/authStore';
import { useLocation, useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivte = useAxiosPrivate();
  const { auth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivte.get('/users', {
          signal: controller.signal, // prepar abort signal if needed.
        });

        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log('Error on call find users', err);
        navigate('/', { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      // controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => {
            return <li key={i}>{user}</li>;
          })}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
