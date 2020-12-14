import React, { useState, useEffect } from "react";
import axios from "axios";

const Convert = ({ language, text }) => {
  const APIKEY = "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM";

  const [translatedResult, setTranslatedResult] = useState("");
  const [deBouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [text]);

  useEffect(() => {
    const doTranslate = async () => {
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: deBouncedText,
            source: "en",
            target: language.value,
            format: "text",
            key: APIKEY,
          },
        }
      );
      setTranslatedResult(data.data.translations[0].translatedText);
    };
    doTranslate();
  }, [language, deBouncedText]);
  return (
    <div>
      <h3 className="header">{translatedResult}</h3>
    </div>
  );
};

export default Convert;
