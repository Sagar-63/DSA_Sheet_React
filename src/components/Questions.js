import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopicPromise, updateQuestion, updateTopic, updateQuestionAndTopic} from "../db-queries.js";
import '../styles/questions.css';

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
        <h1 className="heading link"><Link to="/">Topics</Link>/{topicName}</h1>
        <table>
            <thead>
                <tr>
                    <th>Done?</th>
                    <th>S.No.</th>
                    <th>Questions</th>
                    <th>Bookmark</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
        {questionList.map((question,index)=>{
           return (
            <tr className={question.Done && "greenColor"}>
                <td>
                    <input type="checkbox" checked={question.Done} onChange={(event)=>{console.log(event); handleCheckBox(index)}}></input>
                </td>
                <td>{index+1}</td>
                <td className="link"><a href={question.URL}>{question.Problem}</a></td>
                <td><input type="checkbox" checked={question.Bookmark} onChange={()=>handleBookmark(index)}></input></td>
                <td>
                    {/* <input className="inputNote" type="text" value={question.Notes} onChange={(event)=>{handleNoteChange(index,event.target.value);}}></input> */}
                    {/* <button onClick={()=>handleSave(index)}>Save</button> */}
                    {/* <button className="startButton">Add</button> */}
                    <textarea className={question.Done ? "greenColor inputNote" : "inputNote"} value={question.Notes} onChange={(event)=>{handleNoteChange(index,event.target.value);}} onKeyUp={()=>handleSave(index)}></textarea>
                </td>
            </tr>
           )
           
        })}
        </tbody>
        </table>
        </>
        )
 }