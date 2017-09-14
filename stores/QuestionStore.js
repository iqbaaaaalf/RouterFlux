import {observable} from 'mobx';
import {ListView} from 'react-native';

class QuestionStore{

    questions = [
        {title : "First Question", author: "Iqbal", vote: 47, description: "desc 1", createdAt: new Date("2007-01-24")},
        {title : "Second Question", author: "Dipo", vote: 27, description: "desc 2", createdAt: new Date("2007-02-27")},
        {title : "Third Question", author: "Figo", vote: 7, description: "desc 3", createdAt: new Date("2007-12-11")},
        {title : "Fourth Question", author: "Aga", vote: 18, description: "desc 4", createdAt: new Date("2007-08-18")},
    ];

    @observable dataSource;

    constructor(){
        const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2 });
        this.dataSource = ds.cloneWithRows(this.questions);
    }

    add(doc){
        this.questions.push(doc);
        
        this.refresh();
    }

    refresh(){
        this.dataSource=this.dataSource.cloneWithRows(this.questions);
    }
}

const questionStore = new QuestionStore();
export default questionStore;