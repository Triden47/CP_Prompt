import { useState, useEffect, createContext } from 'react'

export const BwContext = createContext(null)
/*global chrome*/

const BwProvider = ({ children }) => {
    const [ bw, setBw ] = useState([])

    useEffect(() => {
        const hiddenList = (() => {
            chrome.storage.sync.get('hiddenWebsites', function (result) {
                var arr = result.hiddenWebsites;
                if(typeof arr === undefined)
                    setBw([])
                else
                    setBw(arr)
            });
        })
        hiddenList()
    }, [])

    useEffect(() => {
        const hiddenList = (() => {chrome.storage.sync.set({ hiddenWebsites: bw })})
        hiddenList()
    }, [bw])
    
    return (
        <BwContext.Provider value={{
            bw,
            setBw
        }}>
            {children}
        </BwContext.Provider>
    )
}

export default BwProvider