import React from "react";
import {render} from "react-dom";
import MarkdownIt from "markdown-it";

let comments = [
	{
		id: 1,
		author: "Adam Adams",
		text: "This is one comment"
	},
	{
		id: 2,
		author: "Ben Benjamin",
		text: "This is *another* comment"
	},
	{
		id: 3,
		author: "Carl Carling",
		text: "This is a further comment"
	}
];

class CommentBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: props.comments
		};
	}

	handleCommentSubmit(comment) {
		let author = comment.author;
		let text = comment.text;
		let id = Math.floor((Math.random() * 100) + 1);
		this.setState({
			comments: this.state.comments.concat({id, author, text})
		});
	}

	render() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList comments={this.state.comments} />
				<CommentForm onCommentSubmit = {this.handleCommentSubmit.bind(this)} />
			</div>
		);
	}
}

class CommentList extends React.Component {
	render() {
		let commentNodes = this.props.comments.map(function(comment) {
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);
		});

		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
}

class CommentForm extends React.Component {
	constructor() {
		super();
		this.state = {
			author: "",
			text: ""
		};
	}

	handleAuthorChange(e) {
		this.setState({author: e.target.value});
	}
	handleTextChange(e) {
		this.setState({text: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		let author = this.state.author.trim();
		let text = this.state.text.trim();
		if (!text | !author) {
			return;
		}
		this.props.onCommentSubmit({author: author, text: text});
		this.setState({author: "", text: ""});
	}

	render() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
				<input 
					type="text" 
					placeholder="Your Name" 
					value={this.state.author} 
					onChange={this.handleAuthorChange.bind(this)} 
				/>
				<input 
					type="text" 
					placeholder="Say something..." 
					value={this.state.text} 
					onChange={this.handleTextChange.bind(this)} 
				/>
				<input type="submit" value="Post" />
			</form>
		);
	}
}

class Comment extends React.Component {
	rawMarkup() {
		const md = new MarkdownIt();
		const rawMarkup = md.render(this.props.children.toString());
		return { __html: rawMarkup };
	}

	render() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
					<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
}

render(<CommentBox comments={comments} />, document.getElementById("app"));