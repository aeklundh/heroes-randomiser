export const shouldFetchPage = (page, isLoading, isFailed) => {
    return (!page || Object.keys(page).length === 0) && !isLoading && !isFailed;
}
