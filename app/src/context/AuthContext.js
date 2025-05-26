import {useContext, useState, useEffect, createContext} from 'react';
import {Text, SafeAreaView} from 'react-native';
import {account} from '../../../appwriteConfig';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState(false);
    const [user, setUser] = useState(false);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        checkAuth();
    };

   const checkAuth = async () => {
     try {
       const response = await account.get();
       setUser(response);
       setSession(response);
     } catch (error) {
       if (error.code === 401) {
         // No valid session found, treat as not logged in.
         console.log("No active session found");
       } else {
         console.error(error);
       }
     }
     setLoading(false);
   };

    const signin = async ({email, password}) => {
        setLoading(true);
        try{
            const responseSession = await account.createEmailPasswordSession(email, password);
            setSession(responseSession);
            const responseUser = await account.get();
            setUser(responseUser);
            console.log('Login successful:', responseUser.name);
        } catch(err){
            console.error('Login failed:', err.message);
        }
        setLoading(false);
    };

    const signout = async () => {
        setLoading(true);
        await account.deleteSession("current");
        setSession(null);
        setLoading(false);
    };

    const contextData = {session, user, signin, signout};

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? (<SafeAreaView><Text>Loading...</Text></SafeAreaView>) : (children)}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };