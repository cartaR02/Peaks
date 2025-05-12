import { StyleSheet } from "react-native";
const globalStyles = StyleSheet.create({
  // ...
  goBackButton: {
    width: 150,
    alignItems: "center",
    justifyContent: "space-around",
    background: "#FF0000", // <-- change this
    height: 50,
  },
  // ...
});


const GlobalStyles = StyleSheet.create({
  Gtext: {
    color: "#C800FF",
    fontWeight: "400",
    fontFamily: "Verdana",
    textAlign: "center",
  },
  background: {
    backgroundColor: "#2C2A2A",
    flex: 1,
  },
  textStyles: {
    fontSize: 19,
    color: '#C800FF',
    fontWeight: '600',
    fontFamily: 'Verdana',
    textAlign: 'center',
  },
});

export default GlobalStyles;
