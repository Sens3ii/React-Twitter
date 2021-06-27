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
				{ label: "Hello guys this is my Twitter subscribe and like", important: true, like: false, id: 1 },
				{ label: "Yeah! Thanks guys I really appreciated your activity", important: true, like: false, id: 2 },
				{ label: "OMG Someone hacked my account!!!! Noooo wayyyy", important: true, like: false, id: 3 },
				{ label: "Hmmmm wait a minute...", important: true, like: false, id: 4 },
				{ label: "Hey guys I'm nice", important: true, like: false, id: 5 },
				{ label: "Something wrong with my messages", important: true, like: false, id: 6 },
			],
		};
		this.maxId = 6;
		this.deleteItem = this.deleteItem.bind(this);
		this.addItem = this.addItem.bind(this);
		this.onToggleImportant = this.onToggleImportant.bind(this);
		this.onToggleLiked = this.onToggleLiked.bind(this);
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

	onToggleLiked(id) {
		this.setState(({ data }) => {
			const index = data.findIndex((item) => item.id === id);
			const oldItem = data[index];
			const newItem = { ...oldItem, like: !oldItem.like };
			const newData = [...data.slice(0, index), newItem, ...data.slice(index + 1, data.length)];
			return { data: newData };
		});
	}

	onToggleImportant(id) {
		this.setState(({ data }) => {
			const index = data.findIndex((item) => item.id === id);
			const oldItem = data[index];
			const newItem = { ...oldItem, important: !oldItem.important };
			const newData = [...data.slice(0, index), newItem, ...data.slice(index + 1, data.length)];
			return { data: newData };
		});
	}

	render() {
		const { data } = this.state;
		const likedCnt = data.filter((item) => item.like).length;
		const postsCnt = data.length;
		return (
			<div className="app">
				<AppHeader likedCnt={likedCnt} postsCnt={postsCnt} />
				<div className="search-panel d-flex">
					<SearchPanel />
					<PostStatusFilter />
				</div>
				<PostList
					posts={data}
					onDelete={this.deleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleLiked={this.onToggleLiked}
				/>
				<PostAddForm onAdd={this.addItem} />
			</div>
		);
	}
}
