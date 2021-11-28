import { useState, useEffect, createContext } from "react";

export const SearchContext = createContext(null);

const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState("");

    // useEffect(() => {
    //     console.log(search)
    // }, [search])
    return (
        <SearchContext.Provider
            value={{
                search,
                setSearch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;
