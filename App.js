import React, { useState, useEffect } from "react";
import { StatusBar, Dimensions, Platform, AsyncStorage } from "react-native";
import styled, { css } from "styled-components";
import { AppLoading } from "expo";
import { v1 as uuidv1 } from "uuid";

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
  const [isLoadToDos, setIsLoadToDos] = useState(false);
  const [toDos, setToDos] = useState({});
  const [newToDo, setNewToDo] = useState("");
  const onChange = async (text) => {
    setNewToDo(text);
  };

  const addToDo = async () => {
    if (newToDo !== "") {
      const ID = uuidv1();
      const obj = {
        [ID]: {
          id: ID,
          isCompleted: false,
          text: newToDo,
          createdAt: Date.now(),
        },
      };
      await setToDos((p) => Object.assign(p, obj));
      setNewToDo("");
      saveToDos(toDos);
    }
  };
  const deleteToDo = async (id) => {
    const prevToDos = toDos;
    delete prevToDos[id];
    await setToDos(Object.assign({}, prevToDos));
    saveToDos(toDos);
  };
  const updateToDo = async (id, text) => {
    await setToDos({
      ...toDos,
      [id]: {
        ...toDos[id],
        text: text,
      },
    });
    saveToDos(toDos);
  };

  const uncompleteToDo = async (id) => {
    await setToDos({
      ...toDos,
      [id]: {
        ...toDos[id],
        isCompleted: false,
      },
    });
    saveToDos(toDos);
  };

  const completeToDo = async (id) => {
    await setToDos((prev) => {
      prev[id].isCompleted = true;
      return prev;
    });
    saveToDos(toDos);
  };

  const saveToDos = (newToDos) => {
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  };

  const loadToDos = async () => {
    try {
      const items = await AsyncStorage.getItem("toDos");
      setIsLoadToDos(true);
      await setToDos(JSON.parse(items));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadToDos();
  }, []);

  if (!isLoadToDos) {
    return <AppLoading />;
  }
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
          onSubmitEditing={addToDo}
        />
        <ScrollView>
          {Object.values(toDos)
            // .reverse()
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((toDo) => (
              <ToDo
                key={toDo.id}
                updateToDo={updateToDo}
                deleteToDo={deleteToDo}
                completeToDo={completeToDo}
                uncompleteToDo={uncompleteToDo}
                {...toDo}
              />
            ))}
        </ScrollView>
      </Card>
    </Container>
  );
}
