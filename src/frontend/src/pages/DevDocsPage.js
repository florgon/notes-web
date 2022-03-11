import React from 'react';

const NotesListPage = function() {
    return (
        <div className="__notes__list__page">
            <div className="text-center">
                <p className="display-1">
                    Developer documentation.
                </p>
                <p className='text-danger'>Sorry, for now there is no translation for developer documentation...</p>
                <p>
                Website provides free public REST API which you may use for developing own clients or integrations. API is located at "/api/" URL. Almost all methods requires only GET HTTP requests.
                </p>
                <p className="display-3">
                    Authorization.
                </p>
                <p>
                    For authorization you may use method "/api/auth/token/get" which requires two params, "username"
                    and "password", and returns API authorization token. Token should be placed in all future API requests
                    that requires authorization. You should place token inside "Authorization" header with value "Token [YOUR_TOKEN]".
                    If your given credentials is invalid, API will return code 1 (AUTH_INVALID_CREDENTIALS). In additional, there is "/api/auth/token/resolve" method, 
                    which requires "token" param, and returns user information by token.
                </p>
                <p className="display-3">
                    Working with notes.
                </p>
                <p>
                    Work in progress...
                </p>
                <p className="display-3">
                    Response structure.
                </p>
                <p>
                    Work in progress...
                </p>
                <p className="display-3">
                    Error codes
                </p>
                <p>
                    Error code located inside response "error.code" JSON field.
                    <br/><span className="display-6">
                    Auth
                    </span>
                    <br/><span>
                        <span className='text-primary'>Code 0 [AUTH_REQUIRED]</span><br/>You should send authorization token in "Authorization" header (See #Authorization block)
                    </span><br/>
                    <span>
                        <span className='text-primary'>Code 1 [AUTH_INVALID_CREDENTIALS]</span><br/>Something like password/login is invalid when authorizing by given information.
                    </span><br/>
                    <span className="display-6">
                    Notes
                    </span><br/>
                    <span>
                        <span className='text-primary'>Code 10 [NOTE_NOT_EXISTS]</span><br/>Your requested note, that does not exists.
                    </span><br/>
                    <span className="display-6">
                    API
                    </span><br/>
                    <span>
                        <span className='text-primary'>Code 20 [API_FIELD_REQUIRED]</span><br/>You forgot to send on of the required fields.
                    </span><br/>
                    <span>
                        <span className='text-primary'>Code 21 [API_FIELD_INVALID]</span><br/>One of your given field, have invalid format.
                    </span><br/>
                    <span>
                        <span className='text-primary'>Code 22 [API_METHOD_NOT_FOUND]</span><br/>Requested method not found in the API.
                    </span><br/>
                    <span className="display-6">
                    Privacy
                    </span><br/>
                    <span>
                        <span className='text-primary'>Code 30 [PRIVACY_PRIVATE_NOTE]</span><br/>You requested note, that you not have access to (private note of other user).
                    </span><br/>
                    <span className="display-6">
                    Server
                    </span><br/>
                    <span>
                        <span className='text-primary'>Code 50 [NOT_IMPLEMENTED]</span><br/>Requested method is not implemented yet.
                    </span><br/>
                    <span>
                        <span className='text-primary'>Code 51 [SERVER_IS_DOWN]</span><br/>Server is currently unable to process your request due to overload or error.
                    </span>
                </p>
            </div>
        </div>
    )
}

export default NotesListPage;