import React from 'react';

import Cookies from 'js-cookie';


const API_URL = "http://127.0.0.1:8000/api/"


function api_request(method, params=""){
    const onError = function(error){
        console.log(`Failed to fetch API "${method}" method via api_request because of error: `);
        console.error(error);
    }

    const onSuccess = function(result){
        console.log(`Successfully fetched API "${method}" method via api_request!`);
    }

    const onResponse = function(result){
        if ("success" in result){
            return onSuccess(result);
        }

        return onError(result);
    }
    
    console.log(`Fetching API "${method}" method via api_request...`);
    fetch(API_URL + method + "?" + params, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + Cookies.get("AUTH_TOKEN")
        }
    }).then(response => {
        response.json().then(onResponse).catch(onError)
    }).catch(onError)
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
    
        fetch(API_URL + this.method, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + Cookies.get("AUTH_TOKEN")
            }
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

export {api_request};
export default ApiComponent;