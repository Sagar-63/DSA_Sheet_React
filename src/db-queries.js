import LocalBase from 'localbase';
import sheetDataList from './question-sheet.js';
let db=new LocalBase('db');

export function localDbExistsPromise(){
    return db.collection('topics').get();
}

export function storeDataToDBPromise(){
    return db.collection('topics').set(sheetDataList);  
}

export function getAllDbDataPromise(){
    return db.collection('topics').get();
}

export function getTopicPromise(topicName){
    return db.collection('topics').doc({topicName: topicName}).get();
}

export function updateTopic(topicName, addDoneQuestion){
    db.collection('topics').doc({topicName: topicName}).get().then((topic)=>{
       let updatedDoneQuestions= topic.doneQuestions+addDoneQuestion;
       let updatedStarted= (updatedDoneQuestions > 0);
       return db.collection('topics').doc({topicName: topicName}).update(
           {doneQuestions: updatedDoneQuestions, 
            started: updatedStarted
           }
        );
    })   
}

export function updateQuestion(topicName, problemName, updatedProperties){
    
    db.collection('topics').doc({topicName: topicName}).get().then((topic)=>{
        return db.collection('topics').doc({topicName: topicName}).update({
            questions: topic.questions.map((question)=>{
                if(question.Problem === problemName){
                   return {
                       ...question,
                       ...updatedProperties
                    }
                }
                return question;
            })
        })
     })

}

export function updateQuestionAndTopic(topicName, problemName, updatedProperties, addDoneQuestion){
    
    db.collection('topics').doc({topicName: topicName}).get().then((topic)=>{
        let updatedDoneQuestions= topic.doneQuestions+addDoneQuestion;
        let updatedStarted= (updatedDoneQuestions > 0);
        return db.collection('topics').doc({topicName: topicName}).update({
            questions: topic.questions.map((question)=>{
                if(question.Problem === problemName){
                   return {
                       ...question,
                       ...updatedProperties
                    }
                }
                return question;
            }),
            doneQuestions: updatedDoneQuestions, 
            started: updatedStarted
        })
     })

}
