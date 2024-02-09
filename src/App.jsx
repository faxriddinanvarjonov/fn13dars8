import { useRef, useState, useEffect } from "react";
import "./App.css";
import Todos from "./components/todos/todos";

function App() {
  let refOne = useRef();
  let [arr, setArr] = useState([]);

  useEffect(() => {
    let dataTwo = [];
    if (localStorage.getItem("todos")) {
      dataTwo = JSON.parse(localStorage.getItem("todos"));
    }
    setArr(dataTwo);
  }, []);

  let handleCLick = (e) => {
    e.preventDefault();
    let todo = {
      id: Date.now(),
      name: refOne.current.value,
    };

    let copied = JSON.parse(JSON.stringify(arr));
    copied.push(todo);

    setArr(copied);

    localStorage.setItem("todos", JSON.stringify(copied));
  };

  return (
    <>
      <div className="container">
        <div className="header bg-zinc-300">
          <h1 className="font-bold text-2xl text-black">
            Todos <span>{arr.length}</span>
          </h1>
        </div>
        <div className="MainBody">
          <form
            onSubmit={handleCLick}
            className="inputWrapper flex items-center justify-center mt-6 border-2 pl-[20px] rounded-xl"
          >
            <input
              ref={refOne}
              type="text"
              placeholder="Enter todo here"
              className="miniInput w-full bg-white h-[20px] outline-none"
            />

            <button className="bg-blue-600 text-white flex items-center justify-center w-[90px] h-[50px] rounded-xl ButtonChange">
              Submit
            </button>
          </form>
          {arr.map((todo, index) => {
            return <Todos todo={todo} key={index} />;
          })}
          {/* {check ? <Todos valueRef={refOne.current.value} /> : ""} */}
        </div>
      </div>
    </>
  );
}

export default App;
