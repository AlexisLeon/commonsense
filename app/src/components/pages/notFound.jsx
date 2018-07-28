import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div className="error">
        <div className="contain">
          <div className="error--content">
            <h1>Oops!</h1>
            <h3 className="error--content__description">
              Parece que no podemos encontrar
              <br className="hidden-lg-down" />
              la página que estás buscando.
            </h3>
            <h6 className="note">
              Error code: 404
            </h6>
          </div>
        </div>
      </div>
    );
  }
}
