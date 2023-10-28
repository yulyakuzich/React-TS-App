import MainSection from './components/mainSection';
import SearchField from './components/searchField';
import { Component } from 'react';

export default class App extends Component {
  handleSearch = (query: string) => {
    console.log(query);
  };

  render() {
    return (
      <div>
        <SearchField onSearch={this.handleSearch} />
        <MainSection />
      </div>
    );
  }
}
