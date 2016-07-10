import React from "react";
import {render} from "react-dom";

class CommentBox extends React.Component {
	render() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList />
				<CommentForm />
			</div>
		);
	}
}

class CommentList extends React.Component {
	render() {
		return (
			<div className="commentList">
				<Comment author="Pete Hunt">This is one comment</Comment>
				<Comment author="Jordan Walke">This is *another* comment</Comment>
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
	render() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
					{this.props.children}
			</div>
		);
	}
}

render(<CommentBox />, document.getElementById("app"));