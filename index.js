import React, { Component } from "react";
import { render } from "react-dom";
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class Bundle extends Component {
  constructor(props){
    super(props);
    this.state = {
      mod: null
    }
  }

  componentWillMount() {
    this.load(this.props)
  }

  load(props) {
    props.load().then((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
};

const Home = () => (
  <div>home</div>
);

const Foo = () => (
  <Bundle
    load={() => import('./foo' /* webpackChunkName: "foo" */)}
  > 
    {(Foo) => <Foo/>}
  </Bundle>
);

const Bar = () => (
  <Bundle
    load={() => System.import('./bar' /* webpackChunkName: "bar" */)} 
  > 
    {(Bar) => <Bar/>}
  </Bundle>
);

class App extends Component {
  render(){
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/foo">Foo</Link></li>
            <li><Link to="/bar">Bar</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/foo" component={Foo}/>
          <Route path="/bar" component={Bar}/>
        </div>
      </Router>
    );
  }
}



render(
  <App />,
  document.getElementById("root")
);
