import { getPeople } from './api';
import { ErrorBoundary } from './components/errorBoundary';
import ErrorButton from './components/errorButton';
import LoadingComponent from './components/loadingComponent';
import MainSection from './components/mainSection';
import SearchField from './components/searchField';
import { Component } from 'react';

export default class App extends Component {
  state = {
    results: [],
    loading: false,
    search: localStorage.getItem('search') || '',
  };

  componentDidMount(): void {
    const searchLocal = localStorage.getItem('search');

    this.setState({ loading: true });

    getPeople(searchLocal || '').then((resp) => {
      console.log(resp.data);
      this.setState({
        results: resp.data.results,
        loading: false,
      });
    });
  }

  handleSearch = (query: string) => {
    localStorage.setItem('search', query);
    console.log(query);
    this.setState({ loading: true });
    getPeople(query).then((resp) => {
      console.log(resp.data);
      this.setState({
        results: resp.data.results,
        loading: false,
      });
    });
  };

  render() {
    return (
      <div>
        <ErrorBoundary>
          <>
            <SearchField
              value={this.state.search}
              onSearch={this.handleSearch}
            />
            {this.state.loading ? (
              <LoadingComponent />
            ) : (
              <MainSection results={this.state.results} />
            )}
            <ErrorButton />
          </>
        </ErrorBoundary>
      </div>
    );
  }
}
