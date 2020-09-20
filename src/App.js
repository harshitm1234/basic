import React, { useState } from "react";
import "./App.css";
import Card from "./Card.js";

function App() {
	const [searchValue, setSearchValue] = useState("");
	const [filterResult, setFilterResult] = useState([]);
	const [lastSearchedValue, setLastSearchedValue] = useState("");
	const [queryLength, setQueryLength] = useState(16);
	const [url, setUrl] = useState("");

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
		setUrl(`https://api.jikan.moe/v3/search/anime?q=naruto&limit=${length}`);
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				let filter = [];
				filter = data.results.map((element) => ({
					id: element.mal_id,
					image_Url: element.image_url,
					title: element.title,
				}));
				setFilterResult(filter);
			});
	};
	/**
	 * Search Button Handler
	 */
	const searchClickHandler = () => {
		setQueryLength(16);
		fetchCallHandler(searchValue, 16);
		setLastSearchedValue(searchValue);
	};

	/**
	 * handle load more click functionality
	 */
	const loadMoreClickHandler = () => {
		const query = queryLength + 8;
		setQueryLength(query);
		if (query < 128) fetchCallHandler(lastSearchedValue, query);
	};
	return (
		<div className="App">
			<center>
				<div className="App-search">
					<input placeholder="Search Here" value={searchValue} onChange={handleInputChange} />
					<button onClick={searchClickHandler}>Go</button>
				</div>
				<div>
					{filterResult.length ? (
						<>
							<span>Requesting:</span>
							<span className="white">{url}</span>
						</>
					) : null}
				</div>
			</center>

			<div className="card-grid">
				{filterResult.length ? (
					filterResult.map((element) => <Card key={element.id} data={element} />)
				) : (
					<p>No data</p>
				)}
			</div>
			<div className="load">
				{filterResult.length ? <button onClick={loadMoreClickHandler}>Load More</button> : null}
			</div>
		</div>
	);
}

export default App;
