// Libraries.
import React from 'react';

const Alert = function({text, type="success"}) {
    /// @description Bootstrap alert class.
    let className = "alert alert-" + type;
    return (
        <div className={className} role="alert">
            {text}
        </div>
    )
}

export default Alert;