import React, {Component} from "react";
import { render } from "react-dom";
import { Router, Route, Link, hashHistory } from 'react-router'

class App extends Component {
  render(){
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/foo">Foo</Link></li>
          <li><Link to="/bar">Bar</Link></li>
        </ul>

        {this.props.children}
      </div>
    );
  }
}

class Home extends Component {
  render(){
    return <div>home</div>
  }
}

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    {
      path: 'foo',
      getComponents: function(nextState, callback) {
        import('./foo' /* webpackChunkName: "foo" */).then(({default:foo}) => {
          callback(null,foo);
        })
      }
    },
    {
      path: 'bar',
      getComponents: function(nextState, callback) {
        System.import('./bar' /* webpackChunkName: "bar" */).then(({default:bar}) => {
          callback(null,bar);
        })
      }
    },
  ]
}

render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById("root")
);
