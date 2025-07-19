import { useState, createContext, useContext } from 'react';


const SearchContext = createContext();
export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [values, setValues] = useState({
        keyword: "" ,  
        results: []
    })

    return (
        <SearchContext.Provider value={{values, setValues}}>
            {children}
        </SearchContext.Provider>
    );
};

