import { useState, useEffect, createContext } from 'react'
/*global chrome*/

export const SaveContext = createContext(null)

const SaveProvider = ({ children }) => {
    // const [ savedHost, setSavedHost ] = useState([])
    const [ savedEvent, setSavedEvent ] = useState([])

    useEffect(() => {
        const savedList = (() => {
            chrome.storage.sync.get('savedEvents', function (result) {
                var arr = result.savedEvents;
                if(typeof arr === undefined)
                    setSavedEvent([])
                else
                    setSavedEvent(arr)
            });
        })
        savedList()
    }, [])

    useEffect(() => {
        const savedList = (() => {chrome.storage.sync.set({ savedEvents: savedEvent })}) 
        savedList()
        
        chrome.browserAction.setBadgeText({text: (savedEvent.length).toString()}); 
    }, [savedEvent])
    
    return (
        <SaveContext.Provider value={{
            savedEvent,
            setSavedEvent
        }}>
            {children}
        </SaveContext.Provider>
    )
}

export default SaveProvider