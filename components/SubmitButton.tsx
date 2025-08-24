import { Pressable, Text } from "react-native";

type SubmitButtonProps = {
  title?: string;
  onPress: () => void | Promise<void>;
  opacity: boolean;
};

export default function SubmitButton({ title = "Login", onPress , opacity = false}: SubmitButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-11/12 m-auto mt-6 py-3 rounded-md"
      style={opacity ? {backgroundColor : "#8c7300"}  : { backgroundColor : "#e6b800" }}
    >
      <Text
        className="text-center text-lg font-bold"
        style={{color: "#0e0e0e"}}
      >
        {title}
      </Text>
    </Pressable>
  );
}
