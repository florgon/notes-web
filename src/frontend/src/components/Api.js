import React from 'react';

import {getAuthToken} from '../contexts/AuthContext';

// Settings.
const API_URL = "http://127.0.0.1:8000/api/"


function apiRequest(method, params="", onSuccess=undefined, onError=undefined){
    const onErrorHandler = function(error){
        if (onError) onError(error);
        console.log(`Failed to fetch API "${method}" method via apiRequest because of error: `);
        console.error(error);
    }

    const onSuccessHandler = function(result){
        if (onSuccess) onSuccess(result);
        console.log(`Successfully fetched API "${method}" method via apiRequest!`);
    }

    const onResponseHandler = function(result){
        if ("success" in result){
            return onSuccessHandler(result);
        }

        return onErrorHandler(result);
    }

    let headers = {
        "Content-Type": "application/json",
    }

    let token = getAuthToken();
    if (token){
        headers["Authorization"] = "Token " + token;
    }

    console.log(`Fetching API "${method}" method via apiRequest...`);
    fetch(API_URL + method + "?" + params, {
        method: "GET",
        headers: headers
    }).then(response => {
        response.json().then(onResponseHandler).catch(onErrorHandler)
    }).catch(onErrorHandler)
}

class ApiComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false, 
            error: null, 
            result: null
        };
  
        this.onError = this.onError.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onResponse = this.onResponse.bind(this);
    }
  
    onError(error){
        console.log(`Failed to fetch API "${this.method}" method via ApiComponent because of error: `);
        console.error(error);
    
        const message = "error" in error ? error.message : this.props.t("error-unknown");
        this.setState({
            isLoaded: true, 
            error: message,
            result: null,
        });
    }

    onSuccess(result){
        console.log(`Successfully fetched API "${this.method}" method via ApiComponent!`);
  
        this.setState({
            isLoaded: true, 
            error: null,
            result: result.success
        });
    }

    onResponse(result){
        if ("success" in result){
            return this.onSuccess(result);
        }

        return this.onError(result);
    }
  
    componentDidMount(){
        console.log(`Fetching API "${this.method}" method via ApiComponent...`);
    
        let headers = {
            "Content-Type": "application/json",
        }

        let token = getAuthToken();
        if (token){
            headers["Authorization"] = "Token " + token;
        }

        fetch(API_URL + this.method, {
            method: "GET",
            headers: headers
        }).then(response => {
            response.json().then(this.onResponse).catch(this.onError)
        }).catch(this.onError)
    }

    render_body(result, message){}
    render(){
        const { error, isLoaded, result } = this.state;
  
        let message = this.empty_message;
  
        if (error){
            message = Object.create(this.error_message);
            message.text += error;
        }else if (!isLoaded){
            message = this.loading_message;
        }

        return this.render_body(result, message)
    }
}

export {apiRequest};
export default ApiComponent;