class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeID: 0,
			wrapperStyle: {
				backgroundImage: `url('${this.props.data[0].img}')`
			},
			panelStyle: {
				background: this.props.data[0].colour
			},
			buttonHover: false,
			buttonStyle: {
				color: '#ffffff'
			}
		};
	}
	_changeActive(id) {
		this.setState({
			activeID: id,
			wrapperStyle: {
				backgroundImage: `url('${this.props.data[id].img}')`
			},
			panelStyle: {
				backgroundColor: this.props.data[id].colour
			}
		});
	}
	_buttonColour() {
		if(!this.state.buttonHover){
			this.setState({
				buttonHover: true,
				buttonStyle: {
					color: this.props.data[this.state.activeID].colour
				}
			});
		} else {
			this.setState({
				buttonHover: false,
				buttonStyle: {
					color: '#ffffff'
				}
			});
		}
	}
	render() {
		return (
			<section className="wrapper" style={this.state.wrapperStyle}>
				<Selectors 
					data={this.props.data}
					activeID={this.state.activeID}
					_changeActive={this._changeActive.bind(this)}
				/>
				<Panel 
					data={this.props.data[this.state.activeID]}
					panelStyle={this.state.panelStyle}
					buttonStyle={this.state.buttonStyle}
					_buttonColour={this._buttonColour.bind(this)}
				/>
			</section>
		);
	}
}
class Panel extends React.Component {
	render() {
		return (
			<aside className="panel" style={this.props.panelStyle}>
				<h2 className="panel-header">{this.props.data.header}</h2>
				<p className="panel-info">{this.props.data.body}</p>
				<button className="panel-button" 
					style={this.props.buttonStyle}
					onMouseEnter={this.props._buttonColour}
					onMouseLeave={this.props._buttonColour}>
					Read More
				</button>
			</aside>
		);
	}
}
class Selectors extends React.Component {
	_handleClick(e) {
		if (this.props.id !== this.props.activeID) {
			this.props._changeActive(this.props.id);
		} else {
			return;
		}
	}
	render() {
		return (
			<div className="selectors">
				{this.props.data.map((item) => 
					<Selector 
						key={item.id}
						id={item.id}
						_handleClick={this._handleClick}
						_changeActive={this.props._changeActive}
						activeID={this.props.activeID}
					/>
				)}
			</div>
		);
	}
}
class Selector extends React.Component {
	render() {
		let componentClass = 'selector';
		if (this.props.activeID === this.props.id) {
			componentClass = 'selector active';
		}
		return (
			<div className={componentClass} onClick={this.props._handleClick.bind(this)}></div>
		);
	}
}

const data = [{
	id: 0,
	header: 'The Arches National Park: Moab, Utah',
	body: '...',
	colour: '#242846',
	img: 'https://i.ibb.co/SPYKfmM/Moab-1.jpg'
}, {
	id: 1,
	header: 'Trail of Ten Falls: Silver Falls State Park, Oregon',
	body: '...',
	colour: '#ba9077',
	img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/735173/rvc2.jpg'
}, {
	id: 2,
	header: 'Ecola State Park',
	body: '...',
	colour: '#1ABC9C',
	img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/735173/rvc3.jpg'
}, {
	id: 3,
	header: 'Tokyo, Japan',
	body: '...',
	colour: '#C0392B',
	img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/735173/rvc4.jpg'
}, {
	id: 4,
	header: 'Bangkok, Thailand',
	body: '...',
	colour: '#513B56',
	img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/735173/rvc5.jpg'
}];


ReactDOM.render(<App data={data} />, document.querySelector('#app'));