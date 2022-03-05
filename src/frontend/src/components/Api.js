import React from 'react';

import Cookies from 'js-cookie';


const API_URL = "http://127.0.0.1:8000/api/"


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
        console.log("Failed to fetch API ${props.method} method because of error: ");
        console.error(error);
  
        this.setState({
            isLoaded: true, 
            error: error.error.message,
            result: null,
        });
    }

    onSuccess(result){
        console.log("Successfully fetched API ${props.method} method!");
  
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
        console.log("Fetching API ${props.method} method...");
    
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

    render_body(result, message){ throw "Render body is not inherited in chidlren!"}
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

export default ApiComponent;