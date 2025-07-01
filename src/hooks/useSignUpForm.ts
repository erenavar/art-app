import { useState, useCallback } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuthenticated, setEmail, setFullName } from "@/redux/reducers/Auth";
import { doc, setDoc } from "firebase/firestore";
import db from "../../firebase.config"; // BİLGİ: Bu yolu kendi projenize göre ayarlayın
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { IFormData } from "../types"; // BİLGİ: IFormData tipinizin yolu

// BİLGİ: Navigation tipleri. Projenizin ana navigasyon yapısına göre düzenlenebilir.
type RootStackParamList = { Profile: undefined };
type NavigationProp = StackNavigationProp<RootStackParamList, "Profile">;

export const useSignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();

  const [form, setForm] = useState<IFormData>({
    email: "",
    fullName: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [errors, setErrors] = useState<{
    [key in keyof IFormData]?: string | null;
  }>({});

  const handleFormChange = useCallback(
    (fieldName: keyof IFormData, value: string) => {
      setForm((prev) => ({ ...prev, [fieldName]: value }));
    },
    []
  );

  const validateData = (): boolean => {
    setErrors({});
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const fullNamePattern = /^[a-zA-Z\s'-]+$/;
    let valid = true;
    const currentErrors: typeof errors = {};

    if (!emailPattern.test(form.email)) {
      currentErrors.email = "Invalid email address";
      valid = false;
    }
    if (!fullNamePattern.test(form.fullName) || form.fullName.length < 2) {
      currentErrors.fullName = "Please, check your full name.";
      valid = false;
    }
    if (form.password.length < 8) {
      currentErrors.password = "Password must be at least 8 characters.";
      valid = false;
    }
    setErrors(currentErrors);
    return valid;
  };

  const signUpFunc = async () => {
    if (!validateData() || !isChecked || !isLoaded || !signUp) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
        unsafeMetadata: { fullName: form.fullName },
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.log("signUpFunc on hooks", err);
    }
  };

  const onPressVerify = async (verificationCode: string) => {
    if (!isLoaded || !signUp) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });
      if (
        completeSignUp.status === "complete" &&
        completeSignUp.createdSessionId
      ) {
        await setActive({ session: completeSignUp.createdSessionId });
        dispatch(setAuthenticated(true));
        dispatch(setEmail(form.email));
        dispatch(setFullName(form.fullName));

        if (completeSignUp.createdUserId) {
          await setDoc(doc(db, "users", completeSignUp.createdUserId), {
            fullName: form.fullName,
            email: form.email,
            creationDate: new Date(),
          });
        }
        navigation.navigate("Profile");
      }
    } catch (err) {
      console.log("onPressVerify on hooks", err);
    }
  };

  return {
    form,
    handleFormChange,
    isChecked,
    setIsChecked,
    pendingVerification,
    errors,
    signUpFunc,
    onPressVerify,
  };
};
