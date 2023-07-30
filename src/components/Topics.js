import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { getAllDbDataPromise } from "../db-queries.js";
import '../styles/topics.css';

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
   <h1 className="heading">450 DSA PROBLEMS</h1>
   <div className="subHeading">A Handy Reference Guide For Key Questions</div>
   <div class="flexContainer">
   {topicList.map((topic)=>{
      return (
         <div className="topic">
         <Link to={`/question/${topic.topicName}`} className="removeUnderline">
           
           <p>
              <span className="highlight">{topic.topicName} </span>
              <span className="startButton">Start Solving</span>
            </p> 
           Total Questions {topic.totalQuestions}
           {!topic.started && <p>Not Yet Started</p>}
           {topic.started && <p>{topic.totalQuestions-topic.doneQuestions} More To Go</p>}
         </Link>

         </div>
      )
   })}
   </div>
   </>
   )
}