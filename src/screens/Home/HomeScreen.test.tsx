import { render, screen } from "@testing-library/react-native";
import HomeScreen from "./HomeScreen";

jest.mock("@expo-google-fonts/poppins", () => ({
  useFonts: jest.fn(() => [true, null]),
}));

describe("Home Screen", () => {
  let component: ReturnType<typeof render>;

  beforeEach(() => {
    component = render(<HomeScreen />);
  });

  afterEach(() => {
    component.unmount();
  });

  it("renders all elements correctly", () => {
    expect(screen.getByTestId("title")).toBeTruthy();
    expect(screen.getByTestId("smImage1")).toBeTruthy();
    expect(screen.getByTestId("smImage2")).toBeTruthy();
    expect(screen.getByTestId("bgImage")).toBeTruthy();
    expect(screen.getByTestId("bottomText")).toBeTruthy();
    expect(screen.getByTestId("loginButton")).toBeTruthy();
    expect(screen.getByTestId("signUpButton")).toBeTruthy();
  });
});
