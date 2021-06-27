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
				{ label: "Hello guys this is my Twitter subscribe and like", important: false, like: false, id: 1 },
				{ label: "Yeah! Thanks guys I really appreciated your activity", important: false, like: true, id: 2 },
				{ label: "OMG Someone hacked my account!!!! Noooo wayyyy", important: true, like: false, id: 3 },
				{ label: "Hmmmm wait a minute...", important: false, like: false, id: 4 },
				{ label: "Hey guys I'm nice", important: false, like: false, id: 5 },
				{ label: "Something wrong with my messages", important: false, like: false, id: 6 },
			],
			term: "",
			filter: "all",
		};
		this.maxId = 6;
		this.deleteItem = this.deleteItem.bind(this);
		this.addItem = this.addItem.bind(this);
		this.onToggleImportant = this.onToggleImportant.bind(this);
		this.onToggleLiked = this.onToggleLiked.bind(this);
		this.onUpdateSearch = this.onUpdateSearch.bind(this);
		this.onFilterSelect = this.onFilterSelect.bind(this);
	}

	searchPost(items, term) {
		if (term.length === 0) {
			return items;
		}
		return items.filter((item) => {
			return item.label.indexOf(term) > -1;
		});
	}
	filterPost(items, filter) {
		if (filter === "like") {
			return items.filter((item) => item.like);
		} else {
			return items;
		}
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

	onUpdateSearch(term) {
		this.setState({ term: term });
	}
	onFilterSelect(filter) {
		this.setState({ filter: filter });
	}
	render() {
		const { data, term, filter } = this.state;
		const likedCnt = data.filter((item) => item.like).length;
		const postsCnt = data.length;

		const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
		return (
			<div className="app">
				<AppHeader likedCnt={likedCnt} postsCnt={postsCnt} />
				<div className="search-panel d-flex">
					<SearchPanel onUpdateSearch={this.onUpdateSearch} />
					<PostStatusFilter filter={filter} onFilterSelect={this.onFilterSelect} />
				</div>
				<PostList
					posts={visiblePosts}
					onDelete={this.deleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleLiked={this.onToggleLiked}
				/>
				<PostAddForm onAdd={this.addItem} />
			</div>
		);
	}
}
