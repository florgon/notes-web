import React from 'react';

const Footer = function(props) {
    return (
        <footer className="__footer__ bg-light mt-auto">
          <div className="text-center p-2 border-top">
            <div className="w-75 mx-auto row">
                <span className="fw-bold text-muted col">
                    Built with ❤️ by <a href="https://kirillzhosul.site" className="link-info">Kirill Zhosul</a>.
                </span>
                <span className="text-muted col">
                    <a href="https://github.com/kirillzhosul/notes" className="text-reset">Source code at GitHub</a>.
                </span>
                <span className="text-muted col">
                    (с) 2022 <a href="https://kirillzhosul.site" className="text-reset">Kirill Zhosul</a>, an owner of <a href="https://kirillzhosul.site" className="text-reset">kirillzhosul.site</a>
                </span>
            </div>
          </div>
        </footer>
    )
}

export default Footer;