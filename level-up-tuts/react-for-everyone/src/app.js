import React from 'react';
import {render} from 'react-dom';
import ContactsList from './ContactsList';

let contacts = [{
	id: 1,
	name: 'Adam',
	phone: '555 555 5555'
}, {
	id: 2,
	name: 'Bob',
	phone: '555 111 5555'
}, {
	id: 3,
	name: 'Claude',
	phone: '555 555 1234'
}, {
	id: 4,
	name: 'Dave',
	phone: '444 555 5555'
}];

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Contacts List</h1>
				<ContactsList contacts={this.props.contacts}/>
			</div>
		)
	}
}

render(<App contacts={contacts}/>, document.getElementById('app'));