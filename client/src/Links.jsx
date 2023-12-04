/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
const Links = ({ result }) => {
  let domain = result.data.originalURL.split(".")[1];
  console.log(domain);
  let img = `https://www.google.com/s2/favicons?domain=www.${domain}.com&sz=50`;
  return (
    <div className="links-container">
      <ul>
        <img src={img} alt={domain} width="50" />
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
          <button
            type="button"
            className="btn-copy"
            onClick={() => {
              navigator.clipboard.writeText(result.data.shortURL);
            }}
          >
            Copy
          </button>
        </p>
      </ul>
    </div>
  );
};

export default Links;
