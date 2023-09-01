import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../utils/auth";
import { authContext } from "../store/auth-context";

function LoginScreen() {
  const authCtx = useContext(authContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigation = useNavigation();
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      alert("something went wrong");
      setIsAuthenticating(false);
    }

    if (isAuthenticating) {
      return <LoadingOverlay message="Login you in..." />;
    }
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
