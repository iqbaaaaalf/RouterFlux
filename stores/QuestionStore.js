import {observable} from 'mobx';
import {ListView} from 'react-native';
import Rest from 'fetch-on-rest';

class QuestionStore{

    @observable dataSource;
    @observable question = {};
    @observable dataSourceAnswers;
    

    constructor(){
        const prefix="api/v1/";
        
        const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2 });
        //const dsAnswer = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2 });

        this.dataSource = ds.cloneWithRows([]);
        this.dataSourceAnswers = ds.cloneWithRows([]);
        this.api = new Rest("http://192.168.1.3:8000/"+prefix);
        this.refresh();
    }

    add(doc){
        this.api.post('question', doc);
    }

    search(search){
        const self = this;

        this.api.get('question', {search: search}).then(function(response){
            self.dataSource  = self.dataSource.cloneWithRows(response);
        });
    }
    
    update(id, doc){
        const self = this;

        this.api.put('question/'+ id, doc).then( function(){
            self.findOne(id);
            self.refresh();
        });
    }

    findOne(id){
        const self = this;

        this.api.get('question/'+ id).then( function(response){
            self.question = response;
        });
    }

    refresh(){
        const self = this;
        this.api.get('question').then(function(response) {
            self.dataSource = self.dataSource.cloneWithRows(response);
        })
        .catch((error)=>{
            console.log("Api call error");
            alert(error.message);
        });
    }

    addAnswer(questionId, doc){
        const self = this;
        this.api.post('question/'+questionId+'/answers',doc).then(function(response){
            self.findAnswers(questionId);
        });
    }

    findAnswers(questionId){
        const self = this;
        this.api.get('question/'+questionId+"/answers").then(function(response){
            self.dataSourceAnswers = self.dataSourceAnswers.cloneWithRows(response);
        });
    }
}

const questionStore = new QuestionStore();
export default questionStore;
