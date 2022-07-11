import { StatusBar } from "expo-status-bar";
import { memo, Fragment, useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme, pickImage, askForPermission } from "../../utils";
import Context from "../context/Context";

const Colors = theme.colors;

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);

  const { theme: colors } = useContext(Context);

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  const handlePress = () => null;

  const handleProfilePicture = async () => {
    const result = await pickImage();

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  if (!permissionStatus) {
    return <Text>Loading...</Text>;
  }

  if (permissionStatus !== "granted") {
    return <Text>You need to allow this permission</Text>;
  }

  return (
    <Fragment>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={styles.profileHeader}>Profile Screen</Text>
        <Text style={styles.profileHeaderMsg}>
          Please provide your name and an optional profile photo
        </Text>
        <TouchableOpacity
          style={styles.avatarStyle}
          onPress={handleProfilePicture}
        >
          {!selectedImage ? (
            <MaterialCommunityIcons
              name="camera-plus"
              color={colors.iconGray}
              size={45}
            />
          ) : (
            <Image source={{ uri: selectedImage }} style={styles.avatarImg} />
          )}
        </TouchableOpacity>
        <TextInput
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Type your name"
          style={styles.inputStyle}
        />

        <View style={styles.nextButtonStyle}>
          <Button
            title="Next"
            color={colors.secondary}
            onPress={handlePress}
            disabled={!displayName}
          />
        </View>
      </View>
    </Fragment>
  );
};

export default memo(Profile);

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 30,
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeader: {
    fontSize: 22,
    color: Colors.foreground,
  },
  profileHeaderMsg: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 20,
  },
  avatarStyle: {
    height: 120,
    width: 120,
    marginTop: 30,
    borderRadius: 120,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: 120,
  },
  inputStyle: {
    borderBottomColor: Colors.primary,
    marginTop: 40,
    borderBottomWidth: 2,
    width: "100%",
  },
  nextButtonStyle: {
    marginTop: "auto",
    width: 80,
  },
});
