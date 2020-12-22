import { useState } from "react";
import "./ShortenerPanel.css";
import { ITranslatedElement } from "./interfaces";
import { URLList } from "./URLList";

export const ShortenerPanel = () => {
    const [translatedList, setTranslatedList] = useState<ITranslatedElement[]>(
        []
    );
    const [currUrl, setCurrUrl] = useState("");
    const [currError, setCurrError] = useState("");
    const [loading, setLoading] = useState(false);

    const makeItShorter = () => {
        //it will fork only when response is londer than 0.2s
        setLoading(true);
        fetch("http://localhost:8080", {
            method: "POST",
            body: JSON.stringify({ url: currUrl }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                if (result.errorCode !== undefined) {
                    setCurrError(result.message);
                } else {
                    setCurrError("");
                    setTranslatedList([
                        { slug: result.slug, url: currUrl },
                        ...translatedList.filter(
                            (el) => el.slug !== result.slug
                        ),
                    ]);
                }
            })
            .catch((ex) => {
                setCurrError("Error with connection to service");
                setLoading(false);
            });
    };

    return (
        <div className="ShortenerPanel">
            <div className="ShortenerPanel-title">STORD URL Shortener</div>
            <div
                className={
                    "ShortenerPanel-loading " +
                    (loading ? "ShortenerPanel-loading-on" : "")
                }
            >
                Loading ...
            </div>

            <div>
                <textarea
                    value={currUrl}
                    onChange={(e) => setCurrUrl(e.target.value)}
                    placeholder={"Paster your url here"}
                    autoFocus={true}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            makeItShorter();
                        }
                    }}
                />
            </div>
            <div>
                <input
                    type="button"
                    value="Make it short"
                    className="ShortenerPanel-trigger-button"
                    onClick={() => makeItShorter()}
                />

                <div className={"ShortenerPanel-error"}>
                    {currError !== "" && currError}
                </div>
            </div>
            <div data-testid={"list-container"}>
                <URLList translated={translatedList} />
            </div>
        </div>
    );
};
