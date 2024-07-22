import "../styles/index.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import backendURL from "../../backendURL";
import BlockNews from "../components/BlockNews";
import MainPage from "./MainPage";
import QueryNews from "./QueryNews";

export default function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(`${backendURL}/get_news`, {
      method: "GET",
    })
      .then(response => response.json())
      .then(data => setNews(data))
  }, []);

  return (
    <div className="m-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}></Route>
          <Route path="/get_news" element={<BlockNews props={news} />}></Route>
          <Route path="/get_news/:id" element={<QueryNews />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
