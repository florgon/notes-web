import React from 'react';
import NotesListFetched from '../NotesListFetched';

const HomePage = function(props) {
    return (
        <div className="__home__page text-center">
            <div className="__description col-5 mx-auto">
                <p className="display-2 mb-5">Welcome, there!</p>
                <p className="display-6 mb-5">This is notes taking website, that allows you to <i>create</i> private notes and <i>work</i> with them.</p>
                <p className="display-6 mb-5">Website is absolutely <i>free</i> for all.</p>
                

                <div className="row">
                    <a className="btn btn-outline-primary col-3 mx-auto" href="/list">My notes</a>
                    <a className="btn btn-outline-primary col-2 mx-auto" href="http://127.0.0.1:8000/api/">API</a>
                </div>
            </div>
        </div>
    )
}

export default HomePage;