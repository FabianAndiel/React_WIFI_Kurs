import React,{useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {useHttpClient} from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';


const UserPlaces = (props) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const {isLoading, error, sendRequest,clearError} = useHttpClient();
  const userId = useParams().userId;

  useEffect(()=> {
    const fetchPlaces=async () => {
      try{
      const url = process.env.REACT_APP_BACKEND_URL + '/places/user/' + userId;
      const responseData = await sendRequest(url);
      setLoadedPlaces(responseData.places);
    } catch(error){
      console.log(error);
    }
    };
    fetchPlaces();
  },[sendRequest, userId]

  );

  return (
    <>
    <ErrorModal error={error} onClear={clearError}/>
    {isLoading && <LoadingSpinner asOverlay/>}
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
    </>
  );
};

export default UserPlaces;
