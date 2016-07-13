import React from "react";
import {render} from "react-dom";
import MarkdownIt from "markdown-it";

class CommentBox extends React.Component {
	constructor() {
		super();
		this.state = {
			comments: []
		};
	}

	loadCommentsFromServer() {
		$.ajax({
			url: this.props.url,
			dataType: "json",
			cache: false,
			success: function(data) {
				this.setState({comments: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}

	handleCommentSubmit(comment) {
		$.ajax({
			url: this.props.url,
			dataType: "json",
			type: "POST",
			data: comment,
			success: function(data) {
				this.setState({comments: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}

	componentDidMount() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
	}

	render() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList comments={this.state.comments} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
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
		if (!text || !author) {
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

render(<CommentBox url="src/comments.json" pollInterval={2000} />, document.getElementById("app"));