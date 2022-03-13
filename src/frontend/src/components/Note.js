// Libraries.
import { t } from 'i18next';
import React, {Fragment, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const NoteFooter = function({id, text, defaultText, t, isEditing, startEdit, saveEdit, cancelEdit, onDeleteNote}){
  /// @description Note footer with buttons.

  // May note be saved or not?
  const noteMaySaved = (text.length > 0 && text !== defaultText);

  return (
    <div className="card-footer">
      {!isEditing && <Fragment>
        <button className="btn btn-danger" onClick={()=>{onDeleteNote(id)}}>{t("delete-note")}</button>
        &nbsp;
        <button className="btn btn-secondary" onClick={startEdit}>{t("edit-note")}</button>
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
      <div className="display-6 text-center">{t("note-id")}{id} </div>
      <div className="col text-muted text-center">{t("note-created-at")}{convertDate(createdAt)}</div>
      <div className="col text-muted text-center">
        {!wasChanged && <Fragment>{t("note-not-changed")}</Fragment>}
        {wasChanged && <Fragment>{t("note-updated-at")}{convertDate(updatedAt)}</Fragment>}
      </div>
    </div>
  )
}

const NoteBody = function({isEditing, text, setText}){
  /// @description Body of the not with text.
  return (
    <div className="card-body">
      {!isEditing && <ReactMarkdown children={text} remarkPlugins={[remarkGfm]}/>}
      {isEditing && <Fragment>
        <small className="text-muted">{t("markdown-supported")}</small>
        <textarea value={text} className="form-control mt-2" onChange={(e) => {setText(e.target.value)}}/>
      </Fragment>}
    </div>
  )
}

const Note = function ({onDeleteNote, onSaveNote, id, currentText, createdAt, updatedAt}){
  /// @description Note block component.

  // Usings.
  const {t} = useTranslation();

  // States.
  const [text, setText] = useState(currentText); // Currenty displayed text.
  const [defaultText, setDefaultText] = useState(currentText); // Default text for canceling editing.
  const [isEditing, setIsEditing] = useState(false); // Is note currently edited by user?

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

  const cancelEdit = function(){
    /// @description Note cancel edit changes.
    setIsEditing(false);
    setText(defaultText);
  }
  
  return (
    <div className="card shadow">
      <NoteHeader id={id} t={t}
        createdAt={createdAt} updatedAt={updatedAt}/>
      <NoteBody 
        isEditing={isEditing} text={text} defaultText={defaultText}
        setText={setText}/>
      <NoteFooter id={id} t={t} text={text} defaultText={defaultText}
        isEditing={isEditing} 
        onDeleteNote={onDeleteNote} startEdit={startEdit} saveEdit={saveEdit} cancelEdit={cancelEdit}
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