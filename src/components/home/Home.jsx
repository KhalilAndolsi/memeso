import React, { useEffect, useState } from "react";
import "./Home.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../card/Card";

const Home = () => {
  const [data, setData] = useState([]);
  const [more, setMore] = useState(25);
  const [noData, setNoData] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const qValue = searchParams.get("q");

  const getData = async () => {
    await axios
      .get(`https://api.memegen.link/templates`)
      .then((res) => {
        if (qValue) {
          const filteredTemplates = res.data.filter((item) =>
            item.name.toLowerCase().includes(qValue.toLowerCase())
          );
          if (filteredTemplates.length > 0) {
            setData(filteredTemplates);
          } else {
            setData([]);
            setNoData(true);
          }
        } else {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  });

  return (
    <>
      {data.length > 0 ? (
        <>
          <div className="memes container m-auto p-3 ">
            {data.slice(0, more).map((d, i) => (
              <Card key={i} name={d.name} img={d.blank} id={d.id} />
            ))}
          </div>
          {more < data.length && (
            <button
              onClick={() => setMore(more + 25)}
              className="border-2 border-blue-600 text-blue-600 w-1/2 font-semibold p-2 rounded-md relative left-1/2 translate-x-[-50%]"
            >
              more memes
            </button>
          )}
        </>
      ) : !noData ? (
        <h1 className="h-[80vh] grid place-items-center font-bold text-3xl uppercase text-blue-600">Loading...</h1>
      ) : (
        <h1 className="h-[80vh] grid place-items-center font-bold text-3xl uppercase text-blue-600">"{qValue}" Meme Is Not Found</h1>
      )}
    </>
  );
};

export default Home;
