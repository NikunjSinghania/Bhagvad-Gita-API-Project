import "./styles.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Flow from "./Flow";

export default function App() {
  const [shlok, setData] = useState([]);
  const [chapter, setChapter] = useState(1);
  const [slok, setSlok] = useState(1);
  const [max, setMax] = useState();

  const versesMax = () => {
    fetch(`https://bhagavadgitaapi.in/chapter/${chapter}/`).then((res) => {
      res.json().then((data) => {
        setMax(data.verses_count + 1);
      });
    });
  };

  const dataFetch = () => {
    setData([]);
    new Promise((res, rej) => {
      setTimeout(() => res("FOO"), 2000);
    });
    fetch(`https://bhagavadgitaapi.in/slok/${chapter}/${slok}/`).then((res) => {
      res.json().then((data) => {
        setData(data.slok.split("\n"));
      });
    });
  };
  useEffect(() => {
    versesMax();
    dataFetch();
  }, []);

  useEffect(() => {
    dataFetch();
  }, [chapter, slok]);

  // useEffect(() => {

  // }, [chapter]);

  return (
    <div className="App">
      <div id="data">
        <AnimatePresence>
          {shlok.map((e, i) => (
            <span key={i} className="collection">
              <motion.h1
                initial={{
                  y: -200
                }}
                animate={{
                  y: 0
                }}
                exit={{
                  y: -200,
                  opacity: 0
                }}
                transition={{
                  duration: 0.5
                }}
              >
                {e}|
              </motion.h1>
            </span>
          ))}
        </AnimatePresence>
      </div>

      <input
        type="number"
        min="1"
        max="18"
        onChange={(e) => setChapter(e.target.value)}
      />
      <input
        type="number"
        min="1"
        max={max}
        onChange={(e) => setSlok(e.target.value)}
      />
    </div>
  );
}
