/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
const Links = ({ result }) => {
  return (
    <div className="links-container">
      <ul>
        <p className="ogLink">
          <strong>Original Link: </strong> {result.data.originalURL}
        </p>
        <p className="shortLink">
          {" "}
          <strong>Short Link: </strong>
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
