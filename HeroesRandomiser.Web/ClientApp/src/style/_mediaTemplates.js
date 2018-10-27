import { css } from 'styled-components';

const viewportSizes = {
    desktop: 900,
    largeDesktop: 1200
}

export const media = Object.keys(viewportSizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (min-width: ${viewportSizes[label] / 16}em) {
            ${css(...args)}
        }
    `;

    return acc;
}, {});
