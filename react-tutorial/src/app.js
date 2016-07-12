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

	componentDidMount() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({comments: data})
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}

	render() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList comments={this.state.comments} />
				<CommentForm />
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
	render() {
		return (
			<div className="commentForm">
				I'm a CommentForm!
			</div>
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

render(<CommentBox url="src/comments.json" />, document.getElementById("app"));