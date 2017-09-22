import React, { Component } from 'react';
import { Container, Button, Content, Left, Body, Right, Item, Input, ListItem, Text, Icon, Header, Title } from 'native-base';
import {ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {observer} from 'mobx-react/native';


@observer
  export default class Question extends Component{
      constructor(props){
          super(props);
          this.state = {
            displaySearchBar: false,
            search: "",
          }
      }

      handleSearch(){
          const {search} = this.state;

          this.props.store.search(search);

          this.setState({displaySearchBar: false});
      }

      handleGoToQuestionDetail(rowData){
          this.props.store.findAnswers(rowData.id);
          console.log(rowData.id);
          Actions.QuestionDetail({question: rowData});
      }

      renderHeader(){
          const {title} = this.props;

          let header =(
            <Header style={{backgroundColor: "#66ccff"}} androidStatusBarColor='#33bbff'>
                <Left/>
                    <Body>
                        <Title style={{color: "white" }}> {title} </Title>
                    </Body>
                <Right>
                    <Button transparent onPress={() => this.setState({displaySearchBar: true})}>
                        <Icon name="search" style={{color: "white"}}/>
                    </Button>
                    <Button transparent onPress={() => Actions.QuestionAdd()}>
                        <Icon name="add-circle" style={{color: "white"}}/>
                    </Button>
                </Right>
            </Header>
          );

          if(this.state.displaySearchBar){
              header =(
                <Header searchBar rounded style={{backgroundColor: "#66ccff"}} androidStatusBarColor='#33bbff'>
                    <Left>
                    <Item >
                        <Icon name="search"/>
                        <Input 
                            placeholder="search"
                            onChangeText={(text) => this.setState({search : text})}
                            value={this.state.search}
                        />
                    </Item>
                    </Left>
                    <Right>
                    <Button transparent onPress={() => this.handleSearch()}>
                        <Text>Search</Text>
                    </Button>
                    </Right>
                </Header>
              );
          }

          return header;
      }

      renderRow(rowData){
        return(
            //mengarahkan ke router questionDetail, dengan format Actions.RouterTujuan sambil membawa data props question
            <ListItem onPress={() => this.handleGoToQuestionDetail(rowData)}>
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
                        enableEmptySections={true}
                    />
                </Content>
            </Container>
          );
      }
  }