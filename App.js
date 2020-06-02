import React, { useState } from "react";
import { StatusBar, Dimensions, Platform } from "react-native";
import styled, { css } from "styled-components";

import ToDo from "./ToDo";

const { height, width } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  background-color: #f23657;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: white;
  font-size: 30px;
  margin-top: 50px;
  font-weight: 200;
  margin-bottom: 30px;
`;

const BoxShadow = css`
  box-shadow: 0 4px 6px rgb(50, 50, 50), 0 1px 3px rgb(50, 50, 50);
`;

const Card = styled.View`
  background-color: white;
  flex: 1;
  width: ${width - 25}px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px 2px 4px #000000;
  shadow-opacity: 0.25;
  elevation: 5;
  /* ${BoxShadow} */
`;

const TextInput = styled.TextInput`
  padding: 20px;
  border-bottom-color: #bbb;
  border-bottom-width: 1px;
  font-size: 24px;
`;

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: "center",
  },
}))``;

export default function App() {
  const [newToDo, setNewToDo] = useState("");
  const onChange = async (text) => {
    setNewToDo(text);
  };
  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Title>To Do App</Title>
      <Card>
        <TextInput
          value={newToDo}
          onChangeText={onChange}
          placeholder="New To Do"
          placeholderTextColor="#999"
          returnKeyType={"done"}
          autoCorrect={false}
        />
        <ScrollView>
          <ToDo text={"Hello I'm a To Do"} />
        </ScrollView>
      </Card>
    </Container>
  );
}
