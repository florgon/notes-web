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
    const onErrorHandler = function(error){
        /// @description Error response handler.
        if (onError) onError(error);
        console.log(`Failed to fetch API "${method}" method via apiRequest because of error: `);
        console.error(error);
    }

    const onSuccessHandler = function(result){
        /// @description Success response handler.
        if (onSuccess) onSuccess(result);
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

    getErrorMessage(error){
        /// @description Returns error message for error.
        return "error" in error ? error.message : this.props.t("error-unknown");
    }

    onErrorHandler(error){
        /// @description Error response handler.
        console.log(`Failed to fetch API "${this.method}" method via ApiComponent because of error: `);
        console.error(error);
    
        this.setState({
            isLoading: true, result: null,
            error: this.getErrorMessage(error),
        });
    }

    onSuccessHandler(result){
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
        apiRequestWrapper(this.method, "", this.onSuccessHandler, this.onErrorHandler);
    }

    render_body(result, message){
        /// @description Decorated under render() wrapper. Inherited components should do stuff here, not in render().
    }

    render(){
        const { error, isLoading, result } = this.state;
  
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


// Private.

function getHeaders(){
    /// @description Returns headers object for request.
    let headers = DEFAULT_HEADERS;

    let authToken = getAuthToken();
    if (authToken){
        headers["Authorization"] = "Token " + authToken;
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
    apiFetch(apiMethod, apiParams).then(response => {
        // We got 200 OK.
        response.json().then(((response) => {
            // We got valid JSON.
            if ("success" in response) return successHandler(response);
            return errorHandler(response);
        })).catch(errorHandler)
    }).catch(errorHandler);
}

export {
    apiRequest,
    ApiComponent,
};