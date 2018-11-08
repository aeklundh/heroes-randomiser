export const shouldFetchStandardReducable = (state, name) => {
    return !state[name].length && !state.isLoading && !state.isFailed;
}
