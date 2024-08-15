import { useContext } from 'react';
import { AuthProvider } from '../Firebase/AuthProvider/AuthProvider';

const useAuth = () => {
    const authInfo = useContext(AuthProvider)
    return  authInfo;
};

export default useAuth;