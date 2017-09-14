import React, { Component } from 'react';
import { Container, Button, Content, Left, Body, Right, ListItem, Text, Icon, Header, Title, Card, CardItem, Thumbnail } from 'native-base';
import {
    StyleSheet,
    View
  } from 'react-native';
import {Actions} from 'react-native-router-flux';
import moment from'moment';

  export default class QuestionDetail extends Component{
      constructor(){
          super();
          this.state = {
            vote: 0
          };
      }

      componentWillMount(){
          const {vote} = this.props.question;
          this.setState({vote: vote});
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
          </Header>
        )
    }

    voteUp(){
        const currentVote = this.state.vote;
        this.setState({vote: currentVote + 1})
    }

    voteDown(){
        const currentVote = this.state.vote;
        this.setState({vote: currentVote - 1})
    }

      render(){
        const {title, author, description, createdAt} = this.props.question;
        // can be write
        // const title = this.props.question.title;
        // const author = this.props.question.author;

        const {vote} = this.state;

          return(
            <Container>
                {this.renderHeader()}
                <Content>
                    <CardItem bordered>
                        <Left>
                            <Icon name ="help-circle" />
                            <Body>
                                <Text>{title}</Text>
                                <Text note>{author}, on {moment(createdAt).format("DD/MM/YYYY")}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                            <Text>{description}</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.voteUp()}>
                                <Icon active name="arrow-up"/>
                            </Button>
                            <Text>{vote}</Text>
                            <Button transparent onPress={() => this.voteDown()}>
                                <Icon active name="arrow-down"/>
                            </Button>
                        </Right>
                    </CardItem> 
                </Content>
            </Container>
          );
      }
  }

  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
  });

