import React from "react";
import { Link } from "react-router-dom";

const Card = ({ name, img, id }) => {
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
      alert("The Download Is Failed!")
    }
  }
  return (
    <div className="rounded-lg p-3 border-2 border-blue-600">
      <h3 className="font-semibold text-center max-w-full mb-3 text-ellipsis whitespace-nowrap overflow-hidden">{name}</h3>
      <img
        src={img}
        alt={name}
        className="w-full h-72 object-cover rounded-md"
      />
      <div className="flex flex-nowrap gap-2 mt-3">
        <Link title="make your meme" to={`/meme/${id}`} className="bg-blue-600 font-semibold text-white p-2 rounded-md flex-1 text-center">
          Edit
        </Link>
        <button onClick={() => downloadMeme(img, name)} className="bg-blue-600 font-semibold text-white px-3 rounded-md" title="download the template">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            className="fill-white"
          >
            <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
