import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./pages";
import Album from "./pages/album";
import Info from "./pages/info";
import Log from "./pages/log";
import Point from "./pages/point";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="log" element={<Log />} />
          <Route path="info" element={<Info />} />
          <Route path="album" element={<Album />} />
          <Route path="point" element={<Point />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
