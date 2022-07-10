import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useContext, useState } from "react";
import Context from "../context/Context";
import { theme } from "../../utils";
import { signIn, signUp } from "../../firebase.config";

const Colors = theme.colors;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signup");

  const {
    theme: { colors },
  } = useContext(Context);

  const handlePress = async () => {
    if (mode === "signup") {
      await signUp(email, password);
    } else if (mode === "signin") {
      await signIn(email, password);
    }
  };

  const handleMode = () => {
    if (mode === "signup") {
      setMode("signin");
    } else if (mode === "signin") {
      setMode("signup");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.greet}>Welcome to Chat App</Text>
      <Image
        source={require("../assets/welcome-img.png")}
        style={styles.imgStyle}
        resizeMode="cover"
      />
      <View style={styles.inputWrap}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.inputStyle}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          style={[styles.inputStyle, { marginTop: 20 }]}
          secureTextEntry
        />

        <View style={styles.btnWrap}>
          <Button
            title={mode === "signup" ? "Sign Up" : "Sign In"}
            disabled={!email || !password}
            color={colors.secondary}
            onPress={handlePress}
          />
        </View>
        <TouchableOpacity style={styles.leadMsg} onPress={handleMode}>
          <Text style={styles.leadMsgStyle}>
            {mode === "signup"
              ? "Already have an account? Sign In"
              : "Dont't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  greet: {
    color: Colors.foreground,
    fontSize: 24,
    marginBottom: 20,
  },
  imgStyle: {
    width: 180,
    height: 180,
  },
  inputWrap: {
    marginTop: 20,
  },
  inputStyle: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    width: 200,
  },
  btnWrap: {
    marginTop: 20,
  },
  leadMsg: {
    marginTop: 15,
  },
  leadMsgStyle: {
    color: Colors.secondaryText,
  },
});
