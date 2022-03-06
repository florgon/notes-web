import React from 'react';

const Note = function ({onDeleteNote, id, text, created_at}){
  return (
    <div className="__note__ card shadow">
      <div className="card-header">
        <div className="__note__id display-6 text-center">
          Note #{id} 
        </div>
      </div>
      <div className="card-body">
        <div className="__note__text__ display-6">
          {text}
        </div>
        <div className="row border-top">
          <div className="col">
            <div className="__note__created__at__ col text-muted">
              Created at {new Date(created_at).toLocaleDateString("en-GB", {
                "hour": "2-digit",
                "minute": "2-digit"
              })}
            </div>
          </div>
          <div className="col">
            <a onClick={(e) => {
              onDeleteNote(id, e);
            }}>delete</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Note;