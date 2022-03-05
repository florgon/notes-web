import React from 'react';

const NotFoundPage = function(props) {
    return (
        <div className="__not__found__page text-center">

            <p className="__error__text display-1 text-danger">Not found!</p>
            <p className="__error__description display-3 text-black">Page you looking for does not exists.</p>
        </div>
    )
}

export default NotFoundPage;