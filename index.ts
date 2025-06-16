import { registerRootComponent } from "expo";
import App from "./App"; // App.tsx dosyanızın yolu bu olmalı. Eğer App.tsx başka bir dizindeyse yolu güncelleyin (örn: './src/App').

// Uygulamanızın ana bileşenini Expo'ya kaydeder
registerRootComponent(App);
