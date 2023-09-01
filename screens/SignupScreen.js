import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useNavigation } from "@react-navigation/native";
import { authContext } from "../store/auth-context";

function SignupScreen() {
  const authCtx = useContext(authContext);

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigation = useNavigation();

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);

    const token = await createUser(email, password);
    authCtx.authenticate(token);
    setIsAuthenticating(false);
    navigation.navigate("Login");
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
