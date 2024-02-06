import { useState } from "react";
import "./App.css";

import axios from "axios";
import InstaVideo from "./InstaVideo";

export const App = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(false);
  const getVideo = async () => {
    const options = {
      method: "GET",
      url: "https://instagram-post-reels-stories-downloader.p.rapidapi.com/instagram/",
      params: {
        url: `${input}`,
      },
      headers: {
        "X-RapidAPI-Key": "e2043c65b5msh085edeae6a080f3p129716jsnd1f6b3b7a79a",
        "X-RapidAPI-Host":
          "instagram-post-reels-stories-downloader.p.rapidapi.com",
      },
    };

    try {
      setLoader(true);
      const response = await axios.request(options);

      setData(response?.data?.result[0]?.url);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="main">
        <input
          placeholder="Instagram Reel Link"
          onChange={(e) => setInput(e.target.value)}
          type="url"
        />
        <button onClick={getVideo}>GET</button>
      </div>
      <div className="videoContainer">
        {loader ? <p>loading</p> : data && <InstaVideo data={data} />}
      </div>
    </>
  );
};

export default App;
