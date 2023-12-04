import { useState } from "react";
import Links from "./Links";

const Home = () => {
  const [link, setLink] = useState("");
  const [result, setResult] = useState([]);

  const sendData = async () => {
    const data = await fetch("http://localhost:3000/short", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ url: link }),
    });
    const response = await data.json();
    setResult(response);
    setLink("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="container">
        <h2>Welcome to Url Shortner</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="redirectURL"
            className="redirect"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <button type="button" className="btn-generate" onClick={sendData}>
            Generate
          </button>
          {result.length === 0 || result.status === "failed" ? (
            <h4 style={{ fontSize: "18px" }}>Please type url above</h4>
          ) : (
            <Links result={result} />
          )}
        </form>
      </div>
    </>
  );
};

export default Home;
