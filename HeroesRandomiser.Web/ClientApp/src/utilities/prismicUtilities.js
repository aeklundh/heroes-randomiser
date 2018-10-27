import { RichText } from 'prismic-reactjs';

export const linkResolver = (document) => {
    switch (document.type) {
        case "about":
            return "/about";

        default:
            return "/";
    }
};

export const richTextRender = (richText) => {
    if (richText && richText.reduce) {
        return RichText.render(richText);
    } else {
        return false;
    }
}
