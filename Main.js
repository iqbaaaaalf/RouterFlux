import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
  } from 'react-native';
import {Actions, Scene, Router, Switch, Modal} from 'react-native-router-flux';
import About from './components/About';
import Question from './components/Question';

class TabIcon extends Component{
  render(){
    const title = this.props.title;
    return(
      <Text> {title} </Text>
    );
  }
}

  class Main extends Component{
    componentWillMount(){
      this.scenes = Actions.create(
        <Scene key="root" tabs={true}>
          <Scene key="tabbar" tabs={true} tabBarStyle={{backgroundColor:'#f7f7f7'}}>
            <Scene key="Questions" component={Question} title="Questions" icon={TabIcon} hideNavBar={true}/>
            <Scene key="About" component={About} title="ABOUT" icon={TabIcon} hideNavBar={true}/>
          </Scene>
        </Scene>
      );
    }
    render() {
        return <Router scenes={this.scenes}/>
      }
  }

  module.exports= Main;