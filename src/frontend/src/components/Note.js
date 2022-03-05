import React from 'react';

const formatDate = (dateString) => new Date(dateString).toLocaleString()
  
  
const Note = function (props){
    return (
      <div className="__note__ card shadow">
        <div className="card-header">
          <div className="__note__id display-6 text-center">
            Note #{props.id} 
          </div>
        </div>
        <div className="card-body">
          <div className="__note__text__ display-6">
            {props.text}
          </div>
          <div className="__note__created__at__ text-muted border-top">
            Created at {formatDate(props.created_at)}
          </div>
        </div>
      </div>
    )
}

export default Note;