import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopicPromise, updateQuestion, updateTopic, updateQuestionAndTopic} from "../db-queries.js";

export default function Questions(){
    const {topicName} = useParams();
    const [questionList, setQuestionList]= useState([]);

    useEffect(function(){
        getTopicPromise(topicName).then((topicInfo)=>{
            setQuestionList(topicInfo.questions)
        })
    }
    ,[])

    useEffect(function(){

    },[])

    async function handleCheckBox(index){
        // mark question as done or not done
        let newQuestionStatus;
        setQuestionList(
            questionList.map((question, questionIndex)=>{
                if(index===questionIndex){
                   newQuestionStatus= !question.Done;
                   return {...question, Done: !question.Done};
                }
                return question;
            })
        )

        //await updateTopic(topicName, newQuestionStatus ? 1 : -1); todo-> why two await functions not working
        await updateQuestionAndTopic(topicName, questionList[index].Problem, {Done: !questionList[index].Done}, newQuestionStatus ? 1 : -1);
    }
    async function handleBookmark(index){
        //mark question as bookmark or not bookmark
        setQuestionList(
            questionList.map((question, questionIndex)=>{
                if(index===questionIndex){
                    return {...question, Bookmark: !question.Bookmark};
                }
                return question;
            })
        )
        await updateQuestion(topicName, questionList[index].Problem, {Bookmark: !questionList[index].Bookmark});
    }

    function handleNoteChange(index, noteText){
        setQuestionList(
            questionList.map((question, questionIndex)=>{
                if(index===questionIndex){
                    return {...question, Notes: noteText};
                }
                return question;
            })
        )
    }

    async function handleSave(index){
        await updateQuestion(topicName, questionList[index].Problem, {Notes: questionList[index].Notes});
    }

    
    return (
        <>
        <h1>QuestionList Page</h1>
        {questionList.map((question,index)=>{
           return (
               <p>
               {index+1} 
               <a href={question.URL}>{question.Problem}</a>
               <input type="checkbox" checked={question.Done} onChange={(event)=>{console.log(event); handleCheckBox(index)}}></input>
               <input type="checkbox" checked={question.Bookmark} onChange={()=>handleBookmark(index)}></input>
               <input type="text" value={question.Notes} onChange={(event)=>{handleNoteChange(index,event.target.value);}}></input>
               <button onClick={()=>handleSave(index)}>Save</button>
               </p> 
           )
        })}
        </>
        )
 }