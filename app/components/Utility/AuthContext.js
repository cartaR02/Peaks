import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged} from 'firebase/auth';
import { FIREBASE_AUTH } from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);