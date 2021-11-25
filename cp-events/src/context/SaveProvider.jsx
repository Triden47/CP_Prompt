import { useState, useEffect, createContext } from 'react'

export const SaveContext = createContext(null)

const SaveProvider = ({ children }) => {
    const [ savedHost, setSavedHost ] = useState([])
    const [ savedEvent, setSavedEvent ] = useState([])

    useEffect(() => {
        console.log(savedEvent)
    }, [savedEvent])

    // useEffect(() => {
    //     const hiddenList = (() => {
    //         chrome.storage.sync.get('hiddenWebsites', function (result) {
    //             var arr = result.hiddenWebsites;
    //             if(typeof arr === undefined)
    //                 setBw([])
    //             else
    //                 setBw(arr)
    //         });
    //     })
    //     hiddenList()
    // }, [])

    // useEffect(() => {
    //     const hiddenList = (() => {
    //         chrome.storage.sync.set({hiddenWebsites: bw}, function () {
    //                 // console.log(bw)
    //         });
    //     })
    //     hiddenList()
    // }, [bw])
    
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