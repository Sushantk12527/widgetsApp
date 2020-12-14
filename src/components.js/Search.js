import React, { useState, useEffect } from "react";
import axios from "axios";
const Search = () => {
  const [term, setTerm] = useState("programming");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });

      setSearchResult(data.query.search);
    };

    if (term && !searchResult.length) {
      search();
    } else {
      const timeOutId = setInterval(() => {
        if (term) {
          search();
        }
      }, 500);

      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [term]);

  const renderedResults = searchResult.map((result) => {
    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Visit
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>

          {/* there is a span tag which is showed on screen 
         this is called Cross Site Scripting(XSS) attack  */}

          {/* {result.snippet} */}

          {/*  this is the solution for above problems
          but it is not recommended as it makes your code open for XSS attacks */}
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });
  return (
    <div className="ui segment">
      <form className="ui  form">
        <div className="field">
          <label htmlFor="search">Enter Search term</label>
          <input
            type="text"
            name="search"
            className="input"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
        </div>
      </form>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
