import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [search, setSearch] = useState('');
  return (
    <header className="bg-blue-600 p-3 flex flex-col md:flex-row justify-between items-center px-7">
      <Link to="/" className=" font-bold text-3xl text-white p-3 cursor-pointer">
        Meme<span className=" text-red-500">So</span>
      </Link>
      <div className=" flex flex-nowrap gap-2">
        <input
          type="text"
          className="outline-none px-4 py-2 rounded-lg min-w-0"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link
          to={search ? `/?q=${search}` : "/"}
          id="searchBtn"
          className="bg-white w-10 grid place-items-center rounded-lg transition-all hover:bg-red-500 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            className=" group-hover:fill-white transition-all"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </Link>
      </div>
    </header>
  );
};

export default Header;
