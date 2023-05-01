import { useState } from "react";

interface GreetTypes {
  name: string;
  greetType: string;
}

const useGreet = () => {
  const [message, setMessage] = useState<string>("");

  function greet(q: GreetTypes) {
    setMessage(`${q.greetType}, ${q.name}`);
  }

  return { message, greet };
};

export default useGreet;
