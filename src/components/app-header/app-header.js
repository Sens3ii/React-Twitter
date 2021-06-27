import React from "react";
import "./app-header.css";

const AppHeader = ({ likedCnt, postsCnt }) => {
	return (
		<div className="app-header d-flex">
			<h1>Daniil Koilybayev</h1>
			<h2>
				Записей в ленте: {postsCnt} | Понравилось из них: {likedCnt}
			</h2>
		</div>
	);
};

export default AppHeader;
