import React from 'react';
import PropTypes from 'prop-types';

class Page extends React.Component{
	static childContextTypes={
		user: PropTypes.string
	}
	constructor(props){
		super(props)
		this.state={
			user: "何嘉敏"
		}
	}
	getChildContext(){
		return this.state
	}
	render(){
		return (
		<div>
			<h1>主页面</h1>
			<p>我是{this.state.user}</p>
			<SideBar/>
		</div>)
	}
}

class SideBar extends React.Component{
	render(){
		return (
			<Fragment>
				<div>hello sidebar</div>
				<Navbar/>
			</Fragment>
			)
	}
}

class Navbar extends React.Component{
	static contextTypes={
		user:PropTypes.string
	}
	render(){
		return (
		<div>{this.context.user}的导航栏</div>)
	}
}

