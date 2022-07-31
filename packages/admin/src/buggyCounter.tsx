import { useState } from 'react';

export const BuggyCounterA = () => {
  const [state, setState] = useState({
    counter: 0
  });
  const handleClick = () => {
    setState(({ counter }) => ({
      counter: counter + 1
    }));
  };

  const test = () => {
    throw new Error('I crashed!');
  };

  return (
    <>
      {state.counter === 2 ? (
        test()
      ) : (
        <h1
          onClick={() => {
            handleClick();
          }}
        >
          {state.counter}
        </h1>
      )}
    </>
  );
};
