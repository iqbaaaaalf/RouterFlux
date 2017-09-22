import React, { Component } from 'react';
import { Container, Button, Content, Left, Body, Right, Label, Item, Input, Form, Text, Icon, Header, Title } from 'native-base';
import {ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';

  export default class QuestionAdd extends Component{
    constructor(){
        super();
        this.state ={
            text: "",
        };
    }

    handleSave(){

        const {questionId} = this.props;

        // input data to store (DB)
        this.props.store.addAnswer(questionId, this.state);


        //clear form
        this.setState({
            text: "",
        });

        Actions.pop();
    }

      renderHeader(){
          const {title} = this.props;

          return(
            <Header style={{backgroundColor: "#66ccff"}} androidStatusBarColor='#33bbff'>
                <Left>
                    <Button transparent onPress={() => Actions.pop()}>
                        <Icon name="arrow-back" style={{color: "white"}}/>
                    </Button>
                </Left>
                <Body>
                    <Title style={{color: "white" }}> {title} </Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => this.handleSave()}>
                        <Text style={{color: "white"}}> Save </Text>
                    </Button>
                </Right>
            </Header>
          )
      }

      render(){
          return(
              <Container>
                  {this.renderHeader()}
                <Content>
                  <Form>
                      <Item floatingLabel>
                        <Label>Text</Label>
                        <Input 
                        onChangeText={(text) => this.setState({text: text})}
                        value = {this.state.title}
                        multiline={true}
                        numberOfLines={10}
                        style={{height: 200, marginTop:20}}
                        />
                      </Item>
                  </Form>
                </Content>
              </Container>
          );
      }
  }