'use client';

import { useCounterStore } from '../../stores/useCounterStore';

const CounterPage = () => {
  const { count, increment, decrement, reset } = useCounterStore();
  return (
    <>
      <div className="p-4">Count: {count}</div>
      <div>
        <button
          className="px-4 py-2 bg-blue-300 rounded-xl"
          onClick={increment}
        >
          +
        </button>
        <button
          className="px-4 py-2 bg-pink-300 rounded-xl"
          onClick={decrement}
        >
          -
        </button>
        <button className="px-4 py-2 bg-red-300 rounded-xl" onClick={reset}>
          reset
        </button>
      </div>
    </>
  );
};

export default CounterPage;
