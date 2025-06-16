import { Provider } from "react-redux";
import MainNavigation from "./src/navigation/MainNavigation";
import store from "./redux/store";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

export default function App() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </ClerkProvider>
  );
}
