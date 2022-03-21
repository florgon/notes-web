// Libraries.
import { t } from 'i18next';
import React, {Fragment, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const NoteFooter = function({text, defaultText, t, isEditing, isPinned, 
  startEdit, saveEdit, cancelEdit, deleteNote, unpinNote, pinNote}){
  /// @description Note footer with buttons.

  // May note be saved or not?
  const noteMaySaved = (text.length > 0 && text !== defaultText);

  return (
    <div className="card-footer">
      {!isEditing && <Fragment>
        <button className="btn btn-danger" onClick={deleteNote}>{t("delete-note")}</button>
        &nbsp;
        <button className="btn btn-secondary" onClick={startEdit}>{t("edit-note")}</button>
        &nbsp;
        {isPinned && <button className="btn btn-md btn-outline-primary" onClick={unpinNote}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pin-angle" viewBox="0 0 16 16">
              <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146zm.122 2.112v-.002.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a4.507 4.507 0 0 0-.288-.076 4.922 4.922 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a4.924 4.924 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034.114 0 .23-.011.343-.04L9.927 2.028c-.029.113-.04.23-.04.343a1.779 1.779 0 0 0 .062.46z"/>
            </svg>
          </button>}
        {!isPinned && <button className="btn btn-md btn-outline-secondary" onClick={pinNote}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pin" viewBox="0 0 16 16">
              <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282z"/>
            </svg>
          </button>}
      </Fragment>}

      {isEditing && <Fragment>
        {!noteMaySaved && <button className="btn btn-primary" disabled>{t("save-note")}</button>}
        {noteMaySaved && <button className="btn btn-primary" onClick={saveEdit}>{t("save-note")}</button>}
        &nbsp;
        <button className="btn btn-warning" onClick={cancelEdit}>{t("cancel-note-edit")}</button>
      </Fragment>}
    </div>
  )
}

const NoteHeader = function({id, createdAt, updatedAt, t}){
  /// @description Note header with note information.

  // Is note changed?
  const wasChanged = !dateIsSame(createdAt, updatedAt);

  return (
    <div className="card-header">
      <div className="display-6 text-center">
        {t("note-id")}{id}
      </div>

      <div className="text-muted text-center">{t("note-created-at")}{convertDate(createdAt)}</div>
      <div className="text-muted text-center">
        {!wasChanged && <Fragment>{t("note-not-changed")}</Fragment>}
        {wasChanged && <Fragment>{t("note-updated-at")}{convertDate(updatedAt)}</Fragment>}
      </div>
    </div>
  )
}

const NoteBody = function({isEditing, text, setText, handleDrop}){
  /// @description Body of the not with text.
  return (
    <div className="card-body">
      {!isEditing && <ReactMarkdown children={text} remarkPlugins={[remarkGfm]}/>}
      {isEditing && <Fragment>
        <small className="text-muted">{t("markdown-supported")}</small>
        <textarea onDrop={handleDrop} value={text} className="form-control mt-2" onChange={(e) => {setText(e.target.value)}}/>
      </Fragment>}
    </div>
  )
}

const Note = function ({onDeleteNote, onSaveNote, onPinNote, onUnpinNote, id, currentText, currentIsPinned, createdAt, updatedAt}){
  /// @description Note block component.

  // Usings.
  const {t} = useTranslation();

  // States.
  const [text, setText] = useState(currentText); // Currenty displayed text.
  const [defaultText, setDefaultText] = useState(currentText); // Default text for canceling editing.
  const [isEditing, setIsEditing] = useState(false); // Is note currently edited by user?
  const [isPinned, setIsPinned] = useState(currentIsPinned);

  const startEdit = function(){
    /// @description Note start editing.
    setIsEditing(true);
  }

  const saveEdit = function(){
    /// @decription Note save edit changes.
    setIsEditing(false);

    if (text.length === 0){
      // Dissalow to save empty note and raise resetting to default text.
      return false && setText(defaultText);
    }

    if (text === defaultText){
      // Not required to save not changed note.
      return false;
    }

    // Save note.
    onSaveNote(id, text);
    setDefaultText(text);
  }

  const pinNote = function(){
    /// @description Pins note.
    onPinNote(id);
    setIsPinned(true);
  }
  
  const unpinNote = function(){
    onUnpinNote(id)
    setIsPinned(false);
  }

  const cancelEdit = function(){
    /// @description Note cancel edit changes.
    setIsEditing(false);
    setText(defaultText);
  }
  
  const _handleDrop = function(e){
    /// @description Drop handle wrapper.

    // Handle link.
    let dataLink = e.dataTransfer.getData("text/uri-list");
    if (dataLink){
      let markdownLink = `[${dataLink}](${dataLink})`;
      setText(text + markdownLink);
      return true;
    }

    // Unable to handle this type of event.
    return false;
  }

  const handleDrop = function(e){
    /// @description Handles drop event when there is something drag and dropped on note body.

    if (_handleDrop(e)){
      // Prevent default d&d event.
      e.stopPropagation();
      e.preventDefault();
    }
  }


  return (
    <div className="card shadow">
      <NoteHeader id={id} t={t}
        createdAt={createdAt} updatedAt={updatedAt}/>
      <NoteBody 
        isEditing={isEditing} text={text} defaultText={defaultText}
        setText={setText} handleDrop={handleDrop}/>
      <NoteFooter t={t} text={text} defaultText={defaultText}
        isEditing={isEditing} isPinned={isPinned}
        deleteNote={() => onDeleteNote(id)} startEdit={startEdit} saveEdit={saveEdit} cancelEdit={cancelEdit}
        unpinNote={unpinNote} pinNote={pinNote}
      />
    </div>
  )
}

const convertDate = function(timestamp){
  /// @description Converts date to human string.
  return new Date(timestamp).toLocaleDateString("en-GB", {
    "hour": "2-digit",
    "minute": "2-digit"
  })
}

const dateIsSame = (timestampA, timestampB) => {
  /// @description Date is same when difference in minutes is less than 0.1.
  let difference = (new Date(timestampA).getTime() - new Date(timestampB).getTime()) / 1000;
  return Math.abs(difference) < 1
}

export default Note;