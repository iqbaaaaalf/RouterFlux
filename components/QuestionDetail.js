import React, { Component } from 'react';
import { Container, Button, Content, Left, Body, Right, ListItem, Text, Icon, Header, Title, Card, CardItem, Thumbnail, Footer } from 'native-base';
import {
    StyleSheet,
    View,
    ListView,
  } from 'react-native';
import {Actions} from 'react-native-router-flux';
import moment from'moment';
import {observer} from 'mobx-react/native'


@observer
  export default class QuestionDetail extends Component{
      constructor(){
          super();
      }

      componentWillMount(){
          this.props.store.question = this.props.question;
      }
      
    renderHeader(){
        const {title} = this.props;
        const questionId = this.props.question.id;

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
                <Button transparent onPress={() => Actions.AnswerAdd({questionId: questionId})}>
                    <Icon name="add" style={{color: 'white'}}/>
                    <Text> Answer </Text>
                </Button>
            </Right>
          </Header>
        )
    }

    voteUp(){
        const {id, vote} = this.props.store.question;
        
        this.props.store.update(id, {vote: vote + 1});
    }

    voteDown(){
        const {id, vote} = this.props.store.question;
        
        this.props.store.update(id, {vote: vote - 1});
    }

    renderAnswerRow(rowData){
        return (   
            <Card>
                <CardItem bordered>
                    <Body>
                        <Text note>someone, on {moment(new Date()).format("DD/MM/YYYY")}</Text>
                    </Body>
                </CardItem>
                <CardItem bordered>
                    <Body>
                        <Text>
                            {rowData.text}
                        </Text>
                    </Body>
                </CardItem> 
            </Card>
        );
    }

      render(){
        const {title, author, description, createdAt, vote} = this.props.store.question;

          return(
            <Container>
                {this.renderHeader()}
                <Content>
                    <Card>
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
                    </Card>  
                </Content> 

                <Footer style={{height: 320, backgroundColor:"#c2efed"}}>
                    <ListView
                        dataSource={this.props.store.dataSourceAnswers}
                        renderRow={this.renderAnswerRow.bind(this)}
                        enableEmptySections={true}
                    />
                </Footer>     
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

