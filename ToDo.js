import React, { useState } from "react";
import styled from "styled-components";
import { Dimensions, TouchableOpacity, View } from "react-native";

const COMPLETED_COLOR = "#bbb";
const UNCOMPLETED_COLOR = "#373839";
const { width, height } = Dimensions.get("window");

const Container = styled.View`
  width: ${width - 50}px;
  border-bottom-color: #bbb;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 36px;
`;
const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Touchable = styled.TouchableOpacity``;
const Circle = styled.View`
  width: 24px;
  height: 24px;
  border: 2px solid ${(props) => (props.isCompleted ? COMPLETED_COLOR : "red")};
  border-radius: 12px;
  margin-right: 20px;
`;
const Text = styled.Text`
  width: ${width / 2}px;
  ${(props) =>
    props.isCompleted
      ? `
    color: ${COMPLETED_COLOR};
    text-decoration-line: line-through;
  `
      : `
    color: ${UNCOMPLETED_COLOR};
  `}
`;

const TextInput = styled.TextInput`
  width: ${width / 2}px;
  ${(props) =>
    props.isCompleted
      ? `
    color: ${COMPLETED_COLOR};
    text-decoration-line: line-through;
  `
      : `
    color: ${UNCOMPLETED_COLOR};
  `}
`;

const ActionText = styled.Text`
  margin: 10px;
`;

const ToDo = ({ text = "" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [toDoValue, setToDoValue] = useState(text || "");

  const toggleComplete = () => {
    setIsCompleted((prev) => !prev);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const finishEditing = () => {
    setIsEditing(false);
  };

  const onChangeInput = (text) => {
    setToDoValue(text);
  };

  return (
    <Container>
      <Column>
        <Touchable onPress={toggleComplete}>
          <Circle isCompleted={isCompleted} />
        </Touchable>
        {isEditing ? (
          <TextInput
            isCompleted={isCompleted}
            value={toDoValue}
            onChangeText={onChangeInput}
            multiline={true}
            returnKeyType={"done"}
            onBlur={finishEditing}
            blurOnSubmit={true}
          />
        ) : (
          <Text isCompleted={isCompleted}>{toDoValue}</Text>
        )}
      </Column>
      <Column>
        {isEditing ? (
          <TouchableOpacity onPressOut={finishEditing}>
            <ActionText>✅</ActionText>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity onPressOut={startEditing}>
              <ActionText>✏️</ActionText>
            </TouchableOpacity>
            <TouchableOpacity>
              <ActionText>❌</ActionText>
            </TouchableOpacity>
          </>
        )}
      </Column>
    </Container>
  );
};

export default ToDo;
