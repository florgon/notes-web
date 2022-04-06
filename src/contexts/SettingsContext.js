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

const getNoteEditorSplitView = function(){
    /// @description Returns settings NoteEditorSplitView from storage.
    return _getSetting("SettingNoteEditorSplitView", "false") === "true";
}

const SettingsContext = createContext({});
const SettingsProvider = (props) => {
    // Settings states.
    const [notesListViewAsGrid, _setNotesListViewAsGrid] = useState(false);
    const [noteEditorSplitView, _setNoteEditorSplitView] = useState(false);
    const setNotesListViewAsGrid = (value) => {
        _setNotesListViewAsGrid(value);
        localStorage.setItem("SettingNotesListViewAsGrid", value);
    }
    const setNoteEditorSplitView = (value) => {
        _setNoteEditorSplitView(value);
        localStorage.setItem("SettingNoteEditorSplitView", value);
    }

    // Reading settings context from local storage.
    useEffect(() => {
        setNotesListViewAsGrid(getNotesListViewAsGrid());
        _setNoteEditorSplitView(getNoteEditorSplitView());
    }, [_setNotesListViewAsGrid, _setNoteEditorSplitView]);


    const settingsContext = {
        // Functions.
        setNotesListViewAsGrid,
        setNoteEditorSplitView,
        
        // States.
        notesListViewAsGrid,
        noteEditorSplitView
    }

    return (
        <SettingsContext.Provider value={settingsContext} {...props}/>
    )
}

const useSettings = () => React.useContext(SettingsContext);


export {
    SettingsProvider, useSettings,
    
    getNotesListViewAsGrid,
    getNoteEditorSplitView
}