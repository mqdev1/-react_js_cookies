import logo from "./logo.svg";
import "./App.css";
import { getCookie, setCookie, delCookie, listCookies } from "./ReactCookie";
import { useState } from "react";

function App() {
  const [CokValue, setCokValue] = useState("");
  const [CokNewValue, setCokNewValue] = useState("");
  const setCok = () => {
    setCookie({
      name: "cok1",
      value: CokNewValue,
      time: 2,
    });
  };
  const getCok = () => {
    setCokValue(
      getCookie({
        name: "cok1",
      })
    );
  };
  const delCok = () => {
    delCookie({
      name: "cok1",
    });
    console.log(listCookies());
  };
  const allCokies = () => {
    console.log(listCookies());
  };
  return (
    <header className="App-header">
      <h2>React Cookies</h2>
      <div className="d-flex">
        <button onClick={allCokies}>All Cookies</button>
        <button onClick={setCok}>Update/Add Cookie</button>
        <button onClick={getCok}>Display Cookie</button>
        <button onClick={delCok}>Delete Cookie</button>
      </div>
      <div>
        cookie value
        <input
          type={"text"}
          defaultValue={CokNewValue}
          onChange={(e) => {
            setCokNewValue(e.target.value);
          }}
        />
      </div>
      <div>
        Display Cookie
        <input value={CokValue} />
      </div>
    </header>
  );
}

export default App;
