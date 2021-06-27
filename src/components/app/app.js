import React from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import "./app.css";

const App = () => {
	const data = [
		{ label: "Hello guys this is my Twitter subscribe and like", important: true, id: "3feafeaf" },
		{ label: "Yeah! Thanks guys I really appreciated your activity", id: "3fefefeaf" },
		{ label: "OMG Someone hacked my account!!!! Noooo wayyyy", id: "3feaf43eaf" },
		{ label: "Hmmmm wait a minute...", id: "3feaf55eaf" },
		{ label: "Hey guys I'm nice", id: "3feafe65af" },
		{ label: "Something wrong with my messages", id: "3fe87afeaf" },
	];

	return (
		<div className="app">
			<AppHeader />
			<div className="search-panel d-flex">
				<SearchPanel />
				<PostStatusFilter />
			</div>
			<PostList posts={data} />
			<PostAddForm />
		</div>
	);
};

export default App;
