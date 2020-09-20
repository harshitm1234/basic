import React from "react";
import "./Card.css";

function Card({ data }) {
	return (
		<div className="card-container">
			<img src={data.image_Url} alt={data.title} />
			<div className="title-container">
				<h3>{data.title}</h3>
			</div>
		</div>
	);
}

export default Card;
