import React from "react";
import Home from "../Components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import { Main } from "../core/Main/Main";
import PartA from "../Components/Syllabus/PartA";
import PartB from "../Components/Syllabus/PartB";
import PartC from "../Components/Syllabus/PartC";

export const Approuter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Main />}>
            <Route path="/" element={<Home />} />
            <Route path="/part-a" element={<PartA />} />
            <Route path="/part-b" element={<PartB />} />
            <Route path="/part-c" element={<PartC />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
