import { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";

/*
Rules

* Use the setter from useState
* Specify a dependency array
* Use empty array for on-load
* Don't use any state set you set in the dependency array unless are careful
* use useCallback for callbacks
*/

function MyComponent({ url, index }) {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setNumbers(data);
      });
  }, [url]);

  const onAddOne = useCallback(() => {
    setNumbers((currentValue) => [...currentValue, currentValue.length + 1]);
  }, []);

  const sum = useMemo(() => {
    console.log(`Creating numbers: ${JSON.stringify(numbers)}`);
    return numbers.reduce((a, v) => a + v, 0);
  }, [numbers]);

  return (
    <div>
      <div>Numbers: {JSON.stringify(numbers)}</div>
      <div>Sum: {sum}</div>
      <div>Index: {index}</div>
      <div>
        <button onClick={onAddOne}>Add One</button>
      </div>
    </div>
  );
}

function App() {
  const [url, setUrl] = useState("/numbers.json");
  const [index, setIndex] = useState(0);

  const setToBigUrl = useCallback(() => {
    setUrl("/big-numbers.json");
  }, []);

  const addOneToIndex = useCallback(() => {
    setIndex(index + 1);
  }, [index]);

  return (
    <div className="App">
      <MyComponent url={url} index={index} />
      <button onClick={setToBigUrl}>Go big or go home</button>
      <button onClick={addOneToIndex}>Add 1 to {index}</button>
    </div>
  );
}

export default App;
