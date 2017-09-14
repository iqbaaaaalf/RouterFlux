import React, { Component } from 'react';
import { Container, Button, Content, Left, Body, Right, ListItem, Text, Icon, Header, Title } from 'native-base';
import {
    StyleSheet,
    View
  } from 'react-native';

  export default class About extends Component{
      
    renderHeader(){
        const {title} = this.props;

        return(
          <Header style={{backgroundColor: "#66ccff"}} androidStatusBarColor='#33bbff'>
              <Body>
                  <Title style={{color: "white" }}> {title} </Title>
              </Body>
          </Header>
        )
    }

      render(){
          return(
            <Container>
                {this.renderHeader()}
                <Content>
                   <Text style={styles.welcome}>
                       RouterFlux v0.2
                    </Text>
                </Content>
            </Container>
          );
      }
  }

  const styles = StyleSheet.create({
    welcome:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
  });