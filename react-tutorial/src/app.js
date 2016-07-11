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
	}
];

class CommentBox extends React.Component {
	render() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList comments={this.props.comments} />
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
		var md = new MarkdownIt();
		var rawMarkup = md.render(this.props.children.toString());
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