import React,{useEffect, useState} from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {useHttpClient} from '../../shared/hooks/http-hook';
import UsersLists from '../components/UsersList';


const Users = (props) => {
  const [loadedUsers, setLoadedUser] = useState([]);
  const {isLoading, error, sendRequest,clearError} = useHttpClient();

  useEffect(()=> {
    const fetchUser=async () => {
      try{
      const url = process.env.REACT_APP_BACKEND_URL + '/users';
      const responseData = await sendRequest(url);
      setLoadedUser(responseData.users);
    } catch(error){
      console.log(error);
    }
    };
    fetchUser();
  },[sendRequest]

  );

  return (
    <>
    <ErrorModal error={error} onClear={clearError}/>
    {isLoading && <LoadingSpinner asOverlay/>}
    {!isLoading && loadedUsers && <UsersLists items={loadedUsers} />}
    </>
  );
};

export default Users;
