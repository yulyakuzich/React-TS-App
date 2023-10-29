import { Component } from 'react';

export default class LoadingComponent extends Component {
  render() {
    return (
      <section>
        <div className="container">
          <div className="loading_container">
            <div className="ring">
              Loading
              <span className="circle"></span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
