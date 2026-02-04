import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useThemeMode } from "../context/ThemeModeContext";

const Container = styled.View<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  padding: 16px 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 22px;
  font-weight: bold;
`;

const Subtitle = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 12px;
  opacity: 0.9;
`;

export default function Header({
  title = "Job Board",
  subtitle = "Connect with top designers and developers",
}) {
  const { colors, toggleTheme, mode } = useThemeMode();

  return (
    <Container bg={colors.buttonBackground}>
      <Row>
        <Title color={colors.buttonText}>{title}</Title>

        <TouchableOpacity onPress={toggleTheme}>
          <MaterialIcons
            name={mode === "dark" ? "dark-mode" : "light-mode"}
            size={24}
            color={colors.buttonText}
          />
        </TouchableOpacity>
      </Row>

      {subtitle && <Subtitle color={colors.buttonText}>{subtitle}</Subtitle>}
    </Container>
  );
}
