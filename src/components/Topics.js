import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { getAllDbDataPromise } from "../db-queries.js";

export default function Topics(){

   const [topicList, setTopicLIst] = useState([]);
   useEffect(function(){
      getAllDbDataPromise().then((allData)=>{
      setTopicLIst(
            allData.map((topic)=>{
               return {
                  topicName: topic.topicName,
                  position: topic.position,
                  started: topic.started,
                  doneQuestions: topic.doneQuestions,
                  totalQuestions: topic.questions.length
               }
            })
      )});
   },[])
   

   return (
   <>
   <h1>TopicList Page</h1>
   {topicList.map((topic)=>{
      return (
         <div>
         <Link to={`/question/${topic.topicName}`}>
           <p>{topic.topicName}</p> 
           Total Questions : {topic.totalQuestions}
           {!topic.started && <p>Start Solving</p>}
           {topic.started && <p>{topic.totalQuestions-topic.doneQuestions} Remaining</p>}
         </Link>

         </div>
      )
   })}
   </>
   )
}