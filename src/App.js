import { Route, Routes, Link } from "react-router-dom";
import Topics from './components/Topics.js';
import Questions from './components/Questions.js';


function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Topics/>}></Route>
      <Route path="/question/:topicName" element={<Questions/>}></Route>
    </Routes>
    </>
  );
}

export default App;
