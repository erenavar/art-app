import { render } from "@/test";
import HomeScreen from "./HomeScreen";

describe("Home Screen", () => {
  it("test home screen", () => {
    const { queryByTestId } = render(<HomeScreen />);
    const title = queryByTestId("title");
    const smImage1 = queryByTestId("smImage1");
    const smImage2 = queryByTestId("smImage2");
    const bgImage = queryByTestId("bgImage");
    const bottomText = queryByTestId("bottomText");
    const loginButton = queryByTestId("loginButton");
    const signUpButton = queryByTestId("signUpButton");

    expect(title).toBeTruthy();
    expect(smImage1).toBeTruthy();
    expect(smImage2).toBeTruthy();
    expect(bgImage).toBeTruthy();
    expect(bgImage).toBeTruthy();
    expect(bottomText).toBeTruthy();
    expect(loginButton).toBeTruthy();
    expect(signUpButton).toBeTruthy();
  });
});
