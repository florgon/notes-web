import React from 'react';

const Alert = function({text, type="success", classes=""}) {
    let className = "alert alert-" + type + " " + classes;
    return (
        <div className={className} role="alert">
            {text}
        </div>
    )
}

export default Alert;