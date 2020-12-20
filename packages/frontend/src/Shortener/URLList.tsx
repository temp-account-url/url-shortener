import { ITranslatedElement } from "./interfaces";
import { UrlItem } from "./UrlItem";

export const URLList = ({
    translated,
}: {
    translated: ITranslatedElement[];
}) => {
    return (
        <div className="url-list">
            {translated.map((el) => {
                return <UrlItem key={el.slug} item={el} />;
            })}
        </div>
    );
};
