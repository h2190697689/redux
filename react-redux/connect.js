import React from 'react';
import PropTypes from 'prop-types'
import {bindActionCreators} from '../redux实现/redux.js'

// 装饰器模式
// @connect(
// 	state=>({num:state}),
// 	{addGun,removeGun,addGunAsync}
// )

// mapDispatchToProps 可以是对象或者函数形式，这里我使用对象形式
export const connect = (mapStateToProps=state=>state, mapDispatchToProps={})=>(WrapComponent)=>{
	return class ConnectComponent extends React.Component{
		static contextTypes = {
			store: PropTypes.object
		}
		constructor(props, context){
			super(props, context)
			this.state = {
				props: {}
			}
		}
		componentDidMount() {
			const {store} = this.context
			store.subscribe(()=>this.update())
			this.update()
		}
		update() {
			const {store} = this.context
			const stateProps = mapStateToProps(store.getState())
			const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
			this.setState({
				props: {
					...this.state.props,
					...stateProps,
					...dispatchProps
				}
			})
		}
		render(){
			return <WrapComponent {...this.state.props}></WrapComponent>
		}
	}
}


