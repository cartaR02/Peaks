import {Slot, Redirect} from 'expo-router'
import { useAuth } from '../src/context/AuthContext'

export default function AppLayout(){
  const {session} = useAuth()
  return !session ? <Redirect  href="/signin"/> : <Slot/>
}