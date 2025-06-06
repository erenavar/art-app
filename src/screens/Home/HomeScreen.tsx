import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import LogInButton from "@/src/components/LogInButton";
import SignUpButton from "@/src/components/SignUpButton";
import styled from "styled-components/native";

export default function HomeScreen() {
  const [loaded, error] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (error) {
    return <></>;
  }

  return (
    <Container source={require("@/assets/images/background.jpg")}>
      <Title testID="title">
        <BoldTitlePart>Virtual</BoldTitlePart>
        gallery
      </Title>
      <ImagesContainer>
        <TopContainer>
          <SmImage
            testID="smImage1"
            source={require("@/assets/images/head.jpg")}
          />
          <SmImage
            testID="smImage2"
            source={require("@/assets/images/big-foot.jpg")}
          />
        </TopContainer>
        <BgImage
          testID="bgImage"
          source={require("@/assets/images/cyber-particles.jpg")}
        />
      </ImagesContainer>

      <BottomText testID="bottomText">Become an Artist & Collector</BottomText>
      <LogInButton testId="loginButton" />
      <SignUpButton testId="signUpButton" />
      <StatusBar style="auto" />
    </Container>
  );
}

const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 36px;
  font-family: Poppins_500Medium;
  color: white;
`;

const BoldTitlePart = styled.Text`
  font-size: 36px;
  font-family: Poppins_700Bold;
`;

const TopContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const SmImage = styled.Image`
  width: 48%;
  height: 210px;
  border-radius: 10px;
`;

const ImagesContainer = styled.View`
  margin-top: 30px;
  flex-direction: column;
  width: 100%;
`;

const BgImage = styled.Image`
  width: 96%;
  height: 210px;
  border-radius: 8px;
  align-self: center;
  margin-top: 15px;
`;

const BottomText = styled.Text`
  font-family: Poppins_500Medium;
  margin-top: 25px;
  font-size: 25px;
  color: white;
`;
