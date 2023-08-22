import React, { useState } from "react";
import "./style.css";
import { createStore } from "redux";
// 리덕스 4인방
// Provider 이건 컴포넌트 --> 어떤 컴포넌트들에게 제공할 것인가에 대한 '울타리' 역할
// useSelector 어떤 state를 쓰고 싶은지 선택
// useDispatch state값을 변경시킬 때 사용
// connect --> 재사용할 때 필요한거. 그렇지 않으면 불필요
import { Provider, useSelector, useDispatch, connect } from "react-redux";

function reducer(currentState, action) {
  if (currentState === undefined) {
    return {
      number: 1,
    };
  }
  const newState = { ...currentState };
  if (action.type === "PLUS") {
    newState.number++;
  }
  return newState;
}

const store = createStore(reducer);

export default function App() {
  return (
    <div id="container">
      <h1>Root</h1>
      <div id="grid">
        <Provider store={store}>
          <Left1></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div>
  );
}
function Left1(props) {
  return (
    <div>
      <h1>Left1 </h1>
      <Left2></Left2>
    </div>
  );
}
function Left2(props) {
  console.log("2");
  return (
    <div>
      <h1>Left2 : </h1>
      <Left3></Left3>
    </div>
  );
}
function Left3(props) {
  // function f(state) {
  //   return state.number;
  // }
  // const number = useSelector(f);
  console.log("3");
  const number = useSelector((state) => state.number);
  return (
    <div>
      <h1>Left3 : {number}</h1>
    </div>
  );
}
function Right1(props) {
  return (
    <div>
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  );
}
function Right2(props) {
  return (
    <div>
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  );
}
function Right3(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Right3</h1>
      <input
        type="button"
        value="+"
        onClick={() => {
          dispatch({ type: "PLUS" }); // plus라는 액션을 전달함 -->> 리듀서 호출
        }}
      ></input>
    </div>
  );
}
