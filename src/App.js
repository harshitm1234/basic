import React, { useState } from 'react';
import './App.css';
import Card from './Card.js'

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [filterResult, setFilterResult] = useState([]);
  const [lastSearchedValue, setLastSearchedValue] = useState("");
  const [queryLength, setQueryLength] = useState(16)

  /**
   * Input change handler
   * @param {} event 
   */
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchValue(query);
  };

  /**
   * Handle fetch call requests
   * @param {*} search 
   * @param {*} length 
   */
  const fetchCallHandler = (search, length) => {
    fetch(`https://api.jikan.moe/v3/search/anime?q=${search}&limit=${length}`)
      .then(response => response.json())
      .then(data => {
        let filter = [];
        filter = data.results.map(element => ({ image_Url: element.image_url, title: element.title }));
        setFilterResult(filter);
      });
  }
  /**
   * Search Button Handler
   */
  const searchClickHandler = () => {
    setQueryLength(16);
    fetchCallHandler(searchValue, 16);
    setLastSearchedValue(searchValue);
  }


  /**
   * handle load more click functionality
   */
  const loadMoreClickHandler = () => {
    const query = queryLength + 16;
    setQueryLength(query);
    if (query < 128)
      fetchCallHandler(lastSearchedValue, query);
  }
  return (
    <div className="App">
      <div className="App-search">
        <input
          placeholder="Search for Result"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button onClick={searchClickHandler}><i className="fa fa-search"></i></button>
        {filterResult.length ?
          <button onClick={loadMoreClickHandler}>Load More</button>
          : null}
      </div>
      {filterResult.length ?
        filterResult.forEach((element) => <Card />)
        : <p>No data</p>}
    </div>
  );
}

export default App;
