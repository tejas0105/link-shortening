/* eslint-disable no-useless-escape */
import { useState } from "react";
import Links from "./Links";
import Analytics from "./Analytics";

const Home = () => {
  const [link, setLink] = useState("");
  const [analytics, setAnalytics] = useState([]);
  const [result, setResult] = useState([]);
  const [isCorrect, setIsCorrect] = useState(true);

  const sendData = async () => {
    const urlRegex =
      /^(https?:\/\/)?([a-zA-Z0-9_-]+(\.[a-zA-Z]{2,})+)(\/[a-zA-Z0-9_\-]+)*(\/?(\?[a-zA-Z0-9_]+=[a-zA-Z0-9_%]+&?)?)?$/;
    if (urlRegex.test(link)) setIsCorrect(true);
    else setIsCorrect(false);
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
  };

  const getData = async () => {
    const data = await fetch(
      `http://localhost:3000/api/analytics/${
        result.data.shortURL.split("/")[3]
      }`
    );
    const response = await data.json();
    setAnalytics(response);
  };

  return (
    <>
      <div className="container">
        <h2>Welcome to Url Shortner</h2>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="redirectURL"
            className={isCorrect ? "redirect" : "redirect-error"}
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <button type="button" className="btn-generate" onClick={sendData}>
            Generate
          </button>
          {result.length === 0 || result.status === "failed" ? (
            <button type="button" className="btn-analytics-disabled" disabled>
              Get Analytics
            </button>
          ) : (
            <button type="button" className="btn-analytics" onClick={getData}>
              Get Analytics
            </button>
          )}
        </form>
        {result.length === 0 || result.status === "failed" ? (
          <h4 style={{ fontSize: "18px" }}>
            {isCorrect ? (
              "Please type or copy url above"
            ) : (
              <h4
                style={{
                  margin: "0%",
                  fontSize: "18px",
                  color: "rgb(255, 0, 0)",
                }}
              >
                Please type correct URL
              </h4>
            )}
          </h4>
        ) : (
          <Links result={result} />
        )}
        {analytics.length === 0 ? <p></p> : <Analytics analytics={analytics} />}
      </div>
    </>
  );
};

export default Home;
