"use client";

import React from "react";
import { FiSearch } from "react-icons/fi";
import "./common.css";
import Image from "next/image";
export default function SearchBar() {
  return (
    <div className="w-full max-w-sm min-w-[250px]">
      <div className="relative flex items-center">
        {/* Input */}
        <input
          type="text"
          placeholder="Search..."
          style={{ paddingLeft: "14px" }}
          className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-300 text-sm text-slate-700 bg-white placeholder:text-slate-400 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-400 shadow-sm"
        />
        <FiSearch
          className="absolute right-0 w-10 h-5 text-slate-500 cursor-pointer"
          style={{ marginRight: "5px", backgroundColor: "white" }}
        />

        {/* Suggestions */}
        {/* {data.length > 0 && query.trim() !== "" && (
          <ul className="absolute top-12 left-0 right-0 z-10 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto">
            {data.map((item, index) => (
              <li
              style={{padding:"13px"}}
                key={index}
                onClick={() => onSelect && onSelect(item)}
                className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors flex justify-start items-center gap-2 p-3"
              >
                <span>
                  <Image  className="w-10 h-10 object-cover rounded" src={item?.imageUrl} alt={item?.title} width={40} height={40} />  
                </span>
               <span>
                 {item.title}
               </span>
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
}
