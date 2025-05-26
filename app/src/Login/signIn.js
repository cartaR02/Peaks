import {SafeAreaView, View, Image, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import { Redirect } from 'expo-router'
import GlobalStyles from "../constants/globalStyles";

const signIn = () => {
  const {session, signin} = useAuth()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    signin({email, password})
  }

  if(session) return <Redirect href="/"/>

  return (
    <SafeAreaView style={[GlobalStyles.background, styles.container]}>
      <View style={styles.formContainer}>
        <Image
          source={require("../../../assets/images/OtherSplash.png")}
          resizeMode="contain"
          style={{
            marginTop: 10,
            width: "80%",
            height: "40%",
            aspectRatio: 1,
            alignSelf: "center",
          }}
        />
        <Text style={styles.title}>Peaks</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            placeholderTextColor="#ccc"
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 25,
    marginTop: 25,
    fontWeight: "bold",
    color: "#C800FF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: "#fff",
  },
  inputWrapper: {
    padding: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#C800FF",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
export default class SignIn {
}