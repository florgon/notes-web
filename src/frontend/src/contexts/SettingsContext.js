// Libraries.
import React, {createContext, useEffect, useState} from 'react';


// Warning.
// This solution of handling settings is quite messy (mostly about code).


const _getSetting = function(key, default_){
    /// @description Returns setting value from local storage or default value.
    let value = localStorage.getItem(key);

    if (value === null) return default_;
    return value;
}

const getNotesListViewAsGrid = function(){
    /// @description Returns settings NotesListViewAsGrid from storage.
    return _getSetting("SettingNotesListViewAsGrid", "false") === "true";
}

const SettingsContext = createContext({});
const SettingsProvider = (props) => {
    // Settings states.
    const [notesListViewAsGrid, _setNotesListViewAsGrid] = useState(false);
    const setNotesListViewAsGrid = (value) => {
        _setNotesListViewAsGrid(value);
        localStorage.setItem("SettingNotesListViewAsGrid", value);
    }

    // Reading settings context from local storage.
    useEffect(() => {
        setNotesListViewAsGrid(getNotesListViewAsGrid());
    }, [_setNotesListViewAsGrid]);


    const settingsContext = {
        // Functions.
        setNotesListViewAsGrid,
        
        // States.
        notesListViewAsGrid
    }

    return (
        <SettingsContext.Provider value={settingsContext} {...props}/>
    )
}

const useSettings = () => React.useContext(SettingsContext);


export {
    SettingsProvider, useSettings,
    getNotesListViewAsGrid
}