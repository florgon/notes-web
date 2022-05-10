// Libraries.
import React from 'react';

const Footer = function() {
    /// @description Page footer.
    return (
        <footer className="bg-light mt-auto">
          <div className="text-center p-2 border-top">
            <div className="mx-auto row">
                <div className="col-lg mb-1">
                    &copy; 2022 <a href="https://florgon.space">Florgon</a>. <i>{"<"}support@florgon.space{">"}</i>
                </div>
            </div>
          </div>
        </footer>
    )
}

export default Footer;