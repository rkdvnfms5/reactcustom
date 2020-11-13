import React from 'react';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {date : new Date()}; //직접 state에 값을 지정하는건 constructor 한정이다.
	}
	
	//컴포넌트가 dom에 렌더링 된 후에 실행되는 메서드
	componentDidMount(){
		this.timer = setInterval(() => this.tick(),1000);
	}
	
	//컴포넌트가 dom에서 삭제될 때 실행되는 메서드
	componentWillUnmount(){
		clearInterval(this.timer);
	}
	
	tick(){
		this.setState({	//state에 값을 할당하기 위해서는 직접 할당x setState사용
			date : new Date()
		});
	}
	
	render() {
		return (
			<div>
		    	<h1>Hi, World</h1>
		    	<h2>It is {this.state.date.toLocaleTimeString()}</h2>
		    </div>
		);
	}
}

export default App;