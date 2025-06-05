import { Provider } from "react-redux";
import MainNavigation from "./src/navigation/MainNavigation";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
