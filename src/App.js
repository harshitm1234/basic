import React, { useState } from "react";
import "./App.css";
import { connect } from 'react-redux'
import Card from "./Card.js";

function App(props) {
	const [searchValue, setSearchValue] = useState("");
	const [filterResult, setFilterResult] = useState([]);
	const [lastSearchedValue, setLastSearchedValue] = useState("");

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
		const searchUrl = `https://api.jikan.moe/v3/search/anime?q=${search}&limit=${length}`;
		props.onSetUrl(searchUrl);
		fetch(searchUrl)
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
		props.onSetQueryLength(16);
		fetchCallHandler(searchValue, 16);
		setLastSearchedValue(searchValue);
	};

	/**
	 * handle load more click functionality
	 */
	const loadMoreClickHandler = () => {
		const query = props.queryLength + 8;
		props.onSetQueryLength(query);
		if (query < 128) fetchCallHandler(lastSearchedValue, query);
	};
	return (
		<>
			<div className="center">
				<div className="App-search">
					<input placeholder="Search Here" value={searchValue} onChange={handleInputChange} />
					<button onClick={searchClickHandler}>Go</button>
				</div>
			</div>
			<div className="App">
				<center>
					<div>
						{props.urlVal.length ? (
							<>
								<span>Requesting:</span>
								<span className="white">{props.urlVal}</span>
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
		</>
	);
}

const mapStateToProps = state => {
	return {
		urlVal: state.url,
		queryLength: state.queryLength,
	};
}

const mapDispatchtoProps = dispatch => {
	return {
		onSetUrl: (url) => dispatch({ type: 'URL_SET', payload: { url: url } }),
		onSetQueryLength: (length) => dispatch({ type: 'LENGTH_SET', payload: { queryLength: length } })
	}
}

export default connect(mapStateToProps, mapDispatchtoProps)(App);
