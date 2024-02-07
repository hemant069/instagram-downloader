import { useState } from "react";
import "./App.css";

import axios from "axios";
import InstaVideo from "./InstaVideo";

export const App = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const getVideo = async () => {
    const options = {
      method: "GET",
      url: import.meta.env.VITE_URL,
      params: {
        url: `${input}`,
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_Rapid_Key,
        "X-RapidAPI-Host": import.meta.env.VITE_Rapid_Host,
      },
    };

    try {
      setLoader(true);
      const response = await axios.request(options);

      setData(response?.data?.result[0]?.url);
      setLoader(false);
    } catch (error) {
      if (error.message == "Network Error") {
        setError("Please Check You Internet Connection");
      } else {
        setError(error.response?.data?.message);
      }
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
        <button onClick={getVideo}>Download</button>
      </div>
      <div className="videoContainer">
        {data ? (
          loader ? (
            <p>loading</p>
          ) : (
            data && <InstaVideo data={data} />
          )
        ) : (
          <h3>{error}</h3>
        )}
      </div>
    </>
  );
};

export default App;
