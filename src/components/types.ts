export interface IFormData {
  email: string;
  fullName: string;
  password: string;
}

export interface ICustomTextInput {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  editable?: boolean;
  inputError?: boolean;
  errorMessage?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
}
