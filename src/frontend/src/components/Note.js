import React, {Fragment} from 'react';

const Note = function ({onDeleteNote, id, text, created_at, updated_at}){
  const convertDate = function(timestamp){
    return new Date(timestamp).toLocaleDateString("en-GB", {
      "hour": "2-digit",
      "minute": "2-digit"
    })
  }
  const dateIsSame = function(timestamp_a, timestamp_b){
    /// Date is same when difference in minutes is less than 1.
    let diff = (new Date(timestamp_a).getTime() - new Date(timestamp_b).getTime()) / 60000;
    return Math.abs(diff) < 1
  }
  return (
    <div className="__note__ card shadow">
      <div className="card-header">
        <div className="__note__id display-6 text-center">
          Note #{id} 
        </div>
        <div className="__note__created__at__ col text-muted text-center">
          Created at {convertDate(created_at)}
        </div>
        
        <div className="__note__modified__at__ col text-muted text-center">
          {dateIsSame(created_at, updated_at) && 
            <Fragment>Was not changed</Fragment>
          }
          {!dateIsSame(created_at, updated_at) &&
            <Fragment>Updated at {convertDate(updated_at)}</Fragment>
          }
        </div>
      </div>
      <div className="card-body">
        <div className="__note__text__ display-6">
          {text}
        </div>
      </div>
      <div className="card-footer">
      <div className="row">
          <div className="col">
          <button className="btn btn-danger" onClick={(e) => {
                onDeleteNote(id, e);
              }}>Delete
          </button></div>
        </div>
      </div>
    </div>
  )
}

export default Note;