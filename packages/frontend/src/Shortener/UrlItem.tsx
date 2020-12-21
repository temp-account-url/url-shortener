import { ITranslatedElement } from "./interfaces";
import { useRef, useState } from "react";
import "./UrlItem.css";

export const UrlItem = ({ item }: { item: ITranslatedElement }) => {
    const [copied, setCopied] = useState(false);
    const timeout = useRef<any>(-1);

    const link =
        window.location.protocol +
        "//" +
        window.location.host +
        "/" +
        item.slug;

    const copy = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                if (timeout.current !== -1) {
                    clearTimeout(timeout.current);
                }
                setCopied(true);
                timeout.current = setTimeout(() => {
                    setCopied(false);
                }, 2000);
            })
            .catch((err) => {
                alert("Could not copy text");
            });
    };

    return (
        <div className={"URLItem " + (copied ? "URLItem-copied" : "")}>
            <div className={"URLItem-url-short"}>
                <span data-testid={"link"}>{link}</span>
                <div onClick={() => copy(link)}>
                    {copied ? "U got it:)" : "copy"}
                </div>
            </div>
            <div className={"URLItem-url-long"}>
                <div>Long URL:</div> <div>{item.url}</div>
            </div>
        </div>
    );
};
