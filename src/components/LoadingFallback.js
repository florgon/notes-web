import React, {Fragment} from 'react';

const LoadingFallback = function(){
    /// @description This component will be shown when loading some stuff.
    return (
        <Fragment/>
    )
}

const PageLoadingFallback = function({t}){
    /// @description Page loading loader component.
    return (
        <div className="text-center display-6">
            {t("loading")}
        </div>
    )
}


export default LoadingFallback;
export {
    PageLoadingFallback
}