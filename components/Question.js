import React, { Component } from 'react';
import { Container, Button, Content, Left, Body, Right, ListItem, Text, Icon, Header, Title } from 'native-base';
import {ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {observer} from 'mobx-react/native';


@observer
  export default class Question extends Component{
      constructor(props){
          super(props);
      }

      handleAdd(){
          const doc={
            title : "Fift Question", author: "Rika", vote: 24, description: "desc 5", createdAt: new Date("2007-01-09")
          };
          this.props.store.add(doc);
      }

      renderHeader(){
          const {title} = this.props;

          return(
            <Header style={{backgroundColor: "#66ccff"}} androidStatusBarColor='#33bbff'>
                <Left/>
                <Body>
                    <Title style={{color: "white" }}> {title} </Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => this.handleAdd()}>
                        <Icon name="add-circle" style={{color: "white"}}/>
                    </Button>
                </Right>
            </Header>
          )
      }

      renderRow(rowData){
        return(
            //mengarahkan ke router questionDetail, dengan format Actions.RouterTujuan
            <ListItem onPress={() => {Actions.QuestionDetail({question: rowData})}}>
                <Body>
                    <Text>{rowData.author}</Text>
                    <Text>{rowData.title}</Text>
                </Body>
                <Right>
                    <Icon name="arrow-forward" style={{color: "#0098ff"}} />
                </Right>
            </ListItem>
        );
      }
   
      render(){
          const {dataSource} = this.props.store;
          return(
            <Container>
                {this.renderHeader()}
                <Content>
                    <ListView
                        dataSource={dataSource}
                        renderRow = {this.renderRow.bind(this)}
                    />
                </Content>
            </Container>
          );
      }
  }