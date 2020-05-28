// redux的使用以及使用中间件

const createStore = (reducer,enhancer) => {
	if(enhancer) {
		return enhancer(createStore)(reducer)
	}
	let state;
	let listeners = [];

	const getState = () => state;

	const dispatch = (action) => {
		state = reducer(state,action);
		listeners.forEach(listener => listener());
	};

	const subscribe = (listener) => {
		listeners.push(listener);
	    return () => {
	      listeners = listeners.filter(l => l !== listener);
	    }
	};

	dispatch({});

	return { getState, dispatch, subscribe };
}

export function applyMiddleware(...middlewares){
	return createStore=>(...args)=>{
		const store = createStore(...args)
		let dispatch = store.dispatch

		const midApi = {
			getState:store.getState,
			dispatch:(...args)=>dispatch(...args)
		}
		const middlewareChain = middlewares.map(middleware=>middleware(midApi))
		dispatch = compose(...middlewareChain)(store.dispatch)
		return {
			...store,
			dispatch
		}

	}
}
export function compose(...funcs){
	if (funcs.length==0) {
		return arg=>arg
	}
	if (funcs.length==1) {
		return funcs[0]
	}
	return funcs.reduce((ret,item)=> (...args)=>ret(item(...args)))
}

// connect 的 mapDispatchToProps 的 dispatch 封装
function bindActionCreator(creator, dispatch) {
	return (...args)=> dispatch(creator(...args))
}
export function bindActionCreators(creators,dispatch){
	return Object.keys(creators).reduce((ret,item)=>{
		ret[item] = bindActionCreator(creators[item],dispatch)
		return ret
	},{})
}

