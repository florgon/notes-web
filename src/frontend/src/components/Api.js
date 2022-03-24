// Libraries.
import React from 'react';

// Getting auth token for sending authetnication.
import {getAuthToken} from '../contexts/AuthContext';


// Settings.
const API_URL = process.env.REACT_APP_API_URL;
const API_HTTP_METHOD = "GET";
const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
}


function apiRequest(method, params="", onSuccess=undefined, onError=undefined){
    /// @description Makes request to API method.
    const onErrorHandler = function(raw, result){
        /// @description Error response handler.
        if (onError) onError(raw, result);
        console.log(`Failed to fetch API "${method}" method via apiRequest because of error: `);
        console.error(raw);
        console.error(result);
    }

    const onSuccessHandler = function(raw, result){
        /// @description Success response handler.
        if (onSuccess) onSuccess(raw, result);
        console.log(`Successfully fetched API "${method}" method via apiRequest!`);
    }

    // Requesting API.
    console.log(`Fetching API "${method}" method via apiRequest...`);
    apiRequestWrapper(method, params, onSuccessHandler, onErrorHandler);
}

class ApiComponent extends React.Component{
    /// @description API Component. Fetches API on mounting and returning response. All render stuff should be in render_body().
    constructor(props){
        super(props);
        
        // State.
        this.state = {
            isLoading: false, 
            error: null, result: null,
        };
  
        // Binding.
        this.onErrorHandler = this.onErrorHandler.bind(this);
        this.onSuccessHandler = this.onSuccessHandler.bind(this);

        this.getErrorMessage = this.getErrorMessage.bind(this);

        this.fetchAgain = this.fetchAgain.bind(this);
        this.fetch = this.fetch.bind(this);
    }
  
    fetchAgain(){
        this.setState({
            isLoading: false, 
            error: null, result: null,
        });
        this.fetch();
    }


    getErrorMessage(raw, result){
        /// @description Returns error message for error.

        if (result !== undefined && "error" in result){
            let error_message = getErrorMessageFromCode(result.error.code);
            if (error_message) return this.props.t(error_message);
            return result.error.message;
        }

        return (this.props.t("error-unknown") + raw.status + " " + raw.statusText);
    }

    onErrorHandler(raw, result){
        /// @description Error response handler.
        console.log(`Failed to fetch API "${this.method}" method via ApiComponent because of error: `);
        console.error(raw);
        console.error(result);
    
        this.setState({
            isLoading: true, result: null,
            error: this.getErrorMessage(raw, result),
        });
    }

    onSuccessHandler(raw, result){
        /// @description Success response handler.
        console.log(`Successfully fetched API "${this.method}" method via ApiComponent!`);
        this.setState({
            isLoading: true, error: null,
            result: result.success
        });
    }

    componentDidMount(){
        /// @description Requesting API when mounting.
        this.fetch();
    }

    fetch(){
         /// @description Requesting API with fetch.
        console.log(`Fetching API "${this.method}" method via ApiComponent...`);
        apiRequestWrapper(this.method, this.params || "", this.onSuccessHandler, this.onErrorHandler);
    }

    render_body(result, message){
        /// @description Decorated under render() wrapper. Inherited components should do stuff here, not in render().
    }

    render(){
        const {error, isLoading, result} = this.state;
  
        let message = this.empty_message;
  
        if (error){
            message = Object.create(this.error_message);
            message.text += error;
        }else if (!isLoading){
            message = this.loading_message;
        }

        return this.render_body(result, message)
    }
}

const getErrorMessageFromCode = function(code){
    /// @description Returns translation message from code.
    switch(code){
        case 0: return "api-error-auth-required"; // "AUTH_REQUIRED";
        case 1: return "api-error-auth-invalid-credentials"; // "AUTH_INVALID_CREDENTIALS";
        case 2: return "api-error-auth-passwords-not-same"; //"AUTH_PASSWORDS_NOT_SAME";
        case 3: return "api-error-auth-email-taken"; //"AUTH_EMAIL_TAKEN";
        case 4: return "api-error-auth-username-taken"; //"AUTH_USERNAME_TAKEN";
        case 5: return "api-error-auth-service-error"; //"AUTH_SERVICE_ERROR";
        case 6: return "api-error-auth-service-account-taken"; //"AUTH_SERVICE_ACCOUNT_TAKEN";
        case 10: return "api-error-auth-note-not-exists"; //"NOTE_NOT_EXISTS";
        case 20: return "api-error-api-field-required"; //"API_FIELD_REQUIRED";
        case 21: return "api-error-api-field-invalid"; //"API_FIELD_INVALID";
        case 22: return "api-error-api-method-not-found"; //"API_METHOD_NOT_FOUND";
        case 23: return "api-error-api-forbidden"; //"API_FORBIDDEN";
        case 30: return "api-error-privacy-private-note"; //"PRIVACY_PRIVATE_NOTE";
        case 50: return "api-error-not-implemented"; //"NOT_IMPLEMENTED";
        case 51: return "api-error-server-is-down"; //"SERVER_IS_DOWN";
    }
    return undefined;
}


// Private.

function getHeaders(){
    /// @description Returns headers object for request.
    let headers = DEFAULT_HEADERS;

    let authToken = getAuthToken();
    if (authToken){
        //headers["Authorization"] = "Token " + authToken;
    }

    return headers;
}

function buildRequestURL(apiMethod, apiParams=""){
    /// @description Returns ready request URL for API.
    return API_URL + apiMethod + "?" + apiParams;
}

function apiFetch(apiMethod, apiParams=""){
    /// @description Returns fetch for API.
    return fetch(buildRequestURL(apiMethod, apiParams), {
        method: API_HTTP_METHOD,
        headers: getHeaders()
    })
}

function apiRequestWrapper(apiMethod, apiParams, successHandler, errorHandler){
    /// @description Makes API request with given handlers.
    apiFetch(apiMethod, apiParams).then(raw_response => {
        // We got 200 OK.
        raw_response.json().then(((response) => {
            // We got valid JSON.
            if ("success" in response) return successHandler(raw_response, response);
            return errorHandler(raw_response, response);
        })).catch((error) => errorHandler(raw_response, error))
    }).catch(errorHandler);
}

export {
    API_URL,
    apiRequest,
    getErrorMessageFromCode,
    ApiComponent,
};