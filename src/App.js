import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles";
import wordsToNumbers from "words-to-numbers";

const alanKey = "e270936ab4b5e6290b20db6d2248c9b72e956eca572e1d8b807a3e2338fdd0dc/stage";

function App () {
    const classes = useStyles();

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);

    useEffect(()=>{
        alanBtn({
            key : alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === "newHeadlines") {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === "highlight") {
                    setActiveArticle((prevActiveArticle) => (prevActiveArticle + 1));
                } else if(command === "open") {
                    const parsedNumber = number.length > 2 ? wordsToNumbers() : number;
                    const article = articles[parsedNumber-1];

                    if(parsedNumber>20) {
                        alanBtn().playText("Please try that again.")
                    } else {
                        window.open(article.url, "_blank");
                        alanBtn().playText("Opening...");
                    }
                }
            }
        })
    }, [])
    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://alan.app/brand_assets/logo-horizontal/color/alan-logo-horizontal-color.png" className={classes.alanLogo} alt="logo.png"/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    )
};

export default App;