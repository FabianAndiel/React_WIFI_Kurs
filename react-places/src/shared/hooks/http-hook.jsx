import { useState, useCallback } from 'react';
import axios from 'axios';

// Benutzerdefinierter Hook deshalb, da bei geänderten Daten React selbständig rendert
export const useHttpClient = () => {
  // customHook für API-Zugriffe erzeugen
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // in useCallback-Hook einpacken, damit diese Funktion nicht nochmals erzeugt wird
  // durch Hook useCallback werden Funktionen gecacht (https://de.wikipedia.org/wiki/Memoisation)
  const sendRequest = useCallback(
    async (url, method = 'GET', data = null, headers = {}) => {
      setIsLoading(true);

      try {
        const response = await axios(url, {
          method,
          data,
          headers,
          // damit Axios einen http-fehler 422 nicht in den Catch-Block wirft
          // wir wollen ja z.B. bei 422er wissen, was der Schnittstelle nicht passt
          validateStatus: (status) => {
            return status < 500; // Resolve only if the status code is less than 500
          },
        });

        setIsLoading(false);

        if (response.status >= 300) {
          setError(
            response.data.message || 'something went wrong, please try again'
          );
          throw new Error(response.data.message);
        }

        //Axios liefert in .data die Werte von der API
        return response.data;
      } catch (error) {
        setIsLoading(false);
        setError(error.message || 'something went wrong, please try again');
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
