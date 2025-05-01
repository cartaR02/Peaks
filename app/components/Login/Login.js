import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView, Alert,
} from 'react-native';
import GlobalStyles from '../Utility/Style';
import { FIREBASE_AUTH } from '../../../FirebaseConfig'; // Adjust the import based on your project structure
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [Loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH; // Replace with your Firebase Auth instance


    const signIn = async () => {
        if (email === '' || password === '') {
            Alert.alert('Login failed. Please check your credentials and try again. ','' ,[
                {text: 'OK', onPress: () => console.log('Email or password is empty.')},
            ]);
            return;
        }
        // Start trying to sign in the user
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user);
        } catch (error) {
            setError(error.message);
            // Telling user that sign in has failed
            Alert.alert('Login failed. Please check your credentials and try again. ','' ,[
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        } finally {
            setLoading(false);
        }
    };
    
    const signUp = async () => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up:', userCredential.user);
            alert('Check email for verification link!');
        } catch (error) {
            setError(error.message);
            alert('Sign up failed. Please try again: ', error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={[GlobalStyles.background,  styles.container ]}>
            <KeyboardAvoidingView style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={signIn}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={signUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#C800FF',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 15,
    },
});