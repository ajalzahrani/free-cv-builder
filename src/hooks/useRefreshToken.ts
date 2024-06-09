import axios from '../api/axios';
import useAuth from '../store/authStore';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true, // this will send secure cookie, that you can't see
    });

    setAuth(
      { id: response.data.userId, mobile: response.data.mobile },
      response.data.accessToken,
      response.data.refreshToken,
      'user',
    );
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
