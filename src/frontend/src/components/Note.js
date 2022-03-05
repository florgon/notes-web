import React from 'react';

const formatDate = (dateString) => new Date(dateString).toLocaleString()
  
  
const Note = function (props){
    return (
      <div className="__note__ card">
        <div className="card-body">
          <div className="__note__text__ display-6">
            {props.text}
          </div>
          <div className="__note__created__at__ text-muted">
            Created at {formatDate(props.created_at)}
          </div>
        </div>
      </div>
    )
}

export default Note;