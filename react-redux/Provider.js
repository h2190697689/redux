import React from 'react';
import PropTypes from 'prop-types';

class Provider extends Components{
	static childContextTypes ={
		store: PropTypes.object
	}
	constructor(props, context){
		super(props, context)
		this.store = props.store
	}
	getChildContext(){
		return {store: this.store}
	}
	render() {
		return this.props.children  // 直接渲染内部组件
	}
}