import React, { Component } from 'react';
import { Container, Button, Content, Left, Body, Right, ListItem, Text, Icon, Header, Title } from 'native-base';
import {ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';


  export default class Question extends Component{
      constructor(props){
          super(props);
          const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2 });
          this.questions = [
            {title : "First Question", author: "Iqbal"},
            {title : "Second Question", author: "Fakhri"},
            {title : "Third Question", author: "Hendri"},
          ];

          this.state = {
            dataSource: ds.cloneWithRows(this.questions)
          }
      }

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
          return(
            <Container>
                {this.renderHeader()}
                <Content>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow = {this.renderRow.bind(this)}
                    />
                </Content>
            </Container>
          );
      }
  }