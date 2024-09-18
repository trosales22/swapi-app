import axios from 'axios';
import { useEffect } from 'react';
import { debounce, get } from 'lodash';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const debouncedToastError = debounce(toast.error, 250);

axios.defaults.baseURL = import.meta.env.VITE_WS_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const QueryProvider = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.interceptors.response.use(
        (config) => {
          return config;
        },
        (err) => {
          const errorMessage =
            err?.response?.data?.errors?.[0]?.message ||
            err?.response?.data?.message;
          const errorCode = err?.response?.status;
      
          if (errorCode === 400) {
            debouncedToastError(errorMessage || 'Bad Request!');
            throw err;
          }

          if (errorCode === 401) {
            const message =
              get(err, 'response.data.message') || get(err, 'response.message');
            debouncedToastError(message);
            
            navigate('/home');
            throw err;
          }

          if (errorCode === 422) {
            debouncedToastError(errorMessage || 'Unprocessable Entity!');
            throw err;
          }

          if (errorCode === 500) {
            debouncedToastError('Internal Server Error!');
            throw err;
          }

          debouncedToastError('Unable to connect to web service');
          throw err;
        }
    );
  }, [navigate]);

  return (
    <>
      {children}
    </>
  );
};

export default QueryProvider;
