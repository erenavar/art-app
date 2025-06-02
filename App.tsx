// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestComponent from "./components/TestComponent";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Test" component={TestComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import { StatusBar } from "expo-status-bar";
// import {
//   useFonts,
//   Poppins_700Bold,
//   Poppins_500Medium,
// } from "@expo-google-fonts/poppins";
// import LogInButton from "./components/LogInButton";
// import SignUpButton from "./components/SignUpButton";
// import styled from "styled-components/native";
// import { Text } from "react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";
// import TestComponent from "./components/TestComponent";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   // const [loaded, error] = useFonts({
//   //   Poppins_500Medium,
//   //   Poppins_700Bold,
//   // });

//   // if (error) {
//   //   return <></>;
//   // }a

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Test" component={TestComponent} />
//       </Stack.Navigator>
//     </NavigationContainer>

//     // <Container source={require("./assets/images/background.jpg")}>
//     //   <Title>
//     //     <BoldTitlePart>Virtual</BoldTitlePart>
//     //     gallery
//     //   </Title>
//     //   <ImagesContainer>
//     //     <TopContainer>
//     //       <SmImage source={require("./assets/images/head.jpg")} />
//     //       <SmImage source={require("./assets/images/bigfoot.jpg")} />
//     //     </TopContainer>
//     //     <BgImage
//     //       source={require("./assets/images/3d-abstract-cyber-particles-background-design.jpg")}
//     //     />
//     //   </ImagesContainer>

//     //   <BottomText>Become an Artist & Collector</BottomText>
//     //   <LogInButton />
//     //   <SignUpButton />
//     //   <StatusBar style="auto" />
//     // </Container>
//   );
// }

// const Container = styled.ImageBackground`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
// `;

// const Title = styled.Text`
//   font-size: 36px;
//   font-family: Poppins_500Medium;
//   color: white;
// `;

// const BoldTitlePart = styled.Text`
//   font-size: 36px;
//   font-family: Poppins_700Bold;
// `;

// const TopContainer = styled.View`
//   padding: 10px;
//   flex-direction: row;
//   width: 100%;
//   justify-content: space-between;
// `;

// const SmImage = styled.Image`
//   width: 48%;
//   height: 210px;
//   border-radius: 10px;
// `;

// const ImagesContainer = styled.View`
//   margin-top: 30px;
//   flex-direction: column;
//   width: 100%;
// `;

// const BgImage = styled.Image`
//   width: 96%;
//   height: 210px;
//   border-radius: 8px;
//   align-self: center;
//   margin-top: 15px;
// `;

// const BottomText = styled.Text`
//   font-family: Poppins_500Medium;
//   margin-top: 25px;
//   font-size: 25px;
//   color: white;
// `;
