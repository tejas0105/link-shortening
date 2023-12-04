/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
const Links = ({ result }) => {
  console.log(result);
  return (
    <div style={{ margin: "2rem" }}>
      <ul>
        <p className="ogLink">Original Link: {result.data.originalURL}</p>
        <p className="shortLink">
          {" "}
          Short URL:
          <a
            className="link"
            href={result.data.shortURL}
            target="_blank"
            rel="noreferrer"
          >
            {result.data.shortURL}
          </a>
        </p>
      </ul>
    </div>
  );
};

export default Links;
