import { Component } from 'react';
import { SearchFieldProps, SearchFieldState } from '../types';

export default class SearchField extends Component<
  SearchFieldProps,
  SearchFieldState
> {
  state: SearchFieldState = {
    request: this.props.value,
  };

  handleRequestChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      request: (e.target as HTMLInputElement).value,
    });
  };

  handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    this.props.onSearch(this.state.request);
  };

  render() {
    return (
      <>
        <div className="search_field">
          <div className="container column">
            <img
              className="logo_image"
              src="star-wars-logo.svg"
              alt="star-wars-logo"
            />
            <form className="search_form">
              <div className="search_container">
                <input
                  className="search_input"
                  value={this.state.request}
                  placeholder="type your request"
                  onChange={this.handleRequestChange}
                />
              </div>
              <button
                type="submit"
                className="search_button button"
                onClick={this.handleSubmit}
              >
                <svg height="1em" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
