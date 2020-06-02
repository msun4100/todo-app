import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Dimensions, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

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

const textStyle = css`
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
const Text = styled.Text`
  ${textStyle}
`;

const TextInput = styled.TextInput`
  ${textStyle}
`;

const ActionText = styled.Text`
  margin: 10px;
`;

const ToDo = ({
  text = "",
  id,
  deleteToDo,
  updateToDo,
  uncompleteToDo,
  completeToDo,
  isCompleted,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompletedS, setIsCompleted] = useState(isCompleted);
  const [toDoValue, setToDoValue] = useState(text);

  const toggleComplete = (e) => {
    e.stopPropagation();
    if (isCompletedS) {
      uncompleteToDo(id);
    } else {
      completeToDo(id);
    }
    setIsCompleted((prev) => !prev);
  };

  const startEditing = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const finishEditing = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    updateToDo(id, toDoValue);
  };

  const onChangeInput = (text) => {
    setToDoValue(text);
  };

  return (
    <Container>
      <Column>
        <Touchable onPress={toggleComplete}>
          <Circle isCompleted={isCompletedS} />
        </Touchable>
        {isEditing ? (
          <TextInput
            isCompleted={isCompletedS}
            value={toDoValue}
            onChangeText={onChangeInput}
            multiline={true}
            returnKeyType={"done"}
            onBlur={finishEditing}
            blurOnSubmit={true}
          />
        ) : (
          <Text isCompleted={isCompletedS}>{toDoValue}</Text>
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
            <TouchableOpacity
              onPressOut={(e) => {
                e.stopPropagation();
                return deleteToDo(id);
              }}
            >
              <ActionText>❌</ActionText>
            </TouchableOpacity>
          </>
        )}
      </Column>
    </Container>
  );
};

ToDo.propTypes = {
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  updateToDo: PropTypes.func.isRequired,
  deleteToDo: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default ToDo;
