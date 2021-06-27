import React, { Component } from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import "./app.css";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ label: "Hello guys this is my Twitter subscribe and like", important: true, id: 1 },
				{ label: "Yeah! Thanks guys I really appreciated your activity", id: 2 },
				{ label: "OMG Someone hacked my account!!!! Noooo wayyyy", id: 3 },
				{ label: "Hmmmm wait a minute...", id: 4 },
				{ label: "Hey guys I'm nice", id: 5 },
				{ label: "Something wrong with my messages", id: 6 },
			],
		};
		this.maxId = 6;
		this.deleteItem = this.deleteItem.bind(this);
		this.addItem = this.addItem.bind(this);
	}
	deleteItem(id) {
		this.setState(({ data }) => {
			const newData = data.filter((elem) => elem.id !== id);
			return { data: newData };
		});
	}
	addItem(body) {
		this.setState(({ data }) => {
			const newData = [...data, { label: body, id: ++this.maxId }];
			return { data: newData };
		});
	}
	render() {
		const { data } = this.state;
		return (
			<div className="app">
				<AppHeader />
				<div className="search-panel d-flex">
					<SearchPanel />
					<PostStatusFilter />
				</div>
				<PostList posts={data} onDelete={this.deleteItem} />
				<PostAddForm onAdd={this.addItem} />
			</div>
		);
	}
}
