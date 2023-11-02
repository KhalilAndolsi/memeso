import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Meme = () => {
  const { meme } = useParams();
  const [data, setData] = useState({});
  const [yourMeme, setYourMeme] = useState("");
  const [memeType, setMemeType] = useState(".png");

  const getData = async () => {
    await axios
      .get(`https://api.memegen.link/templates/${meme}`)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => (window.location.href = "/"));
  };

  const downloadMeme = async (imgUrl, name) => {
    try {
      const res = await fetch(imgUrl);
      const blob = await res.blob();
      const link = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = link;
      a.download = name;
      a.click();
      URL.revokeObjectURL(link);
    } catch {
      alert("The Download Is Failed!");
    }
  };

  const chekcSpelling = (x) => {
    let newCh = x;
    newCh = newCh.replaceAll("''", '"');
    newCh = newCh.replaceAll(">", "~g");
    newCh = newCh.replaceAll("<", "~l");
    newCh = newCh.replaceAll("\\", "~b");
    newCh = newCh.replaceAll("/", "~s");
    newCh = newCh.replaceAll("#", "~h");
    newCh = newCh.replaceAll("%", "~p");
    newCh = newCh.replaceAll("&", "~a");
    newCh = newCh.replaceAll("?", "~q");
    newCh = newCh.replaceAll("\n", "~n");
    newCh = newCh.replaceAll("-", "--");
    newCh = newCh.replaceAll("_", "__");
    newCh = newCh.replaceAll(" ", "_");
    return newCh;
  };

  useEffect(() => {
    getData();
  });

  const makeMeme = (template) => {
    const memeLines = Array.from(
      document.querySelectorAll(".memeLines input.line")
    );
    let baseUrl = template.replace(/\.png$/, "");
    let pathSegments = memeLines.map((d) =>
      d.value ? chekcSpelling(d.value) : "_"
    );
    if (!baseUrl.endsWith("/")) {
      baseUrl += "/";
    }
    const path = pathSegments.join("/");
    const newImg = baseUrl + path + memeType;

    setYourMeme(newImg);
  };

  return (
    <>
      {data.id ? (
        <div className="p-3 m-auto container">
          <h1 className="text-center font-semibold text-3xl text-blue-600 py-5">
            {data.name}
          </h1>
          <div className="flex flex-nowrap flex-col md:flex-row">
            <div className="memeLines flex flex-col gap-3 p-3 flex-1">
              <h3 className="text-blue-600 py-2 font-semibold">
                Make Your Meme:
              </h3>
              {Array.from({ length: data.lines }, () => "").map((d, i) => (
                <input
                  key={i}
                  defaultValue=""
                  placeholder={`line ${i + 1}`}
                  className="line outline-none border-2 border-blue-600 rounded-lg px-3 py-1"
                  onChange={() => makeMeme(data.blank)}
                />
              ))}
            </div>
            <div className="flex-1 p-2 border-2 border-blue-600 m-3 rounded-lg">
              <img
                src={yourMeme.replace(/\.(png|gif|webp)$/, memeType) || data.blank.replace(/\.png$/, memeType)}
                alt={data.name}
                className="object-contain rounded-md h-[300px] m-auto"
              />
              <h3 className="text-blue-600 py-2 font-semibold">
                Download Your Meme With Type:
              </h3>
              <div className="flex gap-2 py-2">
                <button
                  onClick={() => setMemeType(".png")}
                  className={`flex-1  rounded-md border-2 border-blue-600 ${
                    memeType === ".png"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600"
                  }`}
                >
                  .png
                </button>
                <button
                  onClick={() => setMemeType(".gif")}
                  className={`flex-1  rounded-md border-2 border-blue-600 ${
                    memeType === ".gif"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600"
                  }`}
                >
                  .gif
                </button>
                <button
                  onClick={() => setMemeType(".webp")}
                  className={`flex-1  rounded-md border-2 border-blue-600 ${
                    memeType === ".webp"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600"
                  }`}
                >
                  .webp
                </button>
              </div>
              <button
                onClick={() =>
                  downloadMeme(
                    yourMeme || data.blank.replace(/\.png$/, memeType),
                    data.name
                  )
                }
                className="bg-blue-600 rounded-lg text-white w-full py-1 mb-2 font-semibold"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="h-[80vh] grid place-items-center font-bold text-3xl uppercase text-blue-600">
          Loading...
        </h1>
      )}
    </>
  );
};

export default Meme;
