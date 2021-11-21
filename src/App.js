import React,{useState,useEffect} from 'react'
import './App.css';
import axios from "axios";

function App() {
  const[input,setInput] = useState('Technology'); //default input 
  const [article,setArticle]=useState([]);        // storing articles into array

  //reading input field
  function readValue(value){
    setInput(value);
  }

  //return to default input state if no input provided
  const resetInput = () => {
    setInput('Technology')
}
  //truncating long news description appended with ... 
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  //fetch specific news as user input +
  //re-render input state variable everytime it changes 
  useEffect(() => {
    async function getNews(){
     const res= await axios.get(`https://newsapi.org/v2/everything?q=${input}&apiKey=88b5ed72a3e543f9a116a1633f92885e`)
    console.log(res.data)
    setArticle(res.data.articles)
     }
      getNews();
  }, [input])

    /*  fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=88b5ed72a3e543f9a116a1633f92885e`)
    .then((response)=> response.json())
    .then((data)=>{
      setArticle(data.articles);
    })
    .catch((error) => {
      console.log(error)
    }) */
  

  return (
    <div className="app">
      <h1>News Hunt</h1>
      <div className="search">
      <input type="text" onChange={(e) =>{readValue(e.target.value)}} placeholder="Enter category here..."/>
      <button >Submit</button>
    </div>
    
   <div className="wrapper">
   {
     input?(
     article.map((articles,index) =>{
       return(
         <div key={index} className="cards">
           <img src={articles.urlToImage} alt="img-src" />
           <h4>{articles.title}</h4>
           
           <div className="author_publish">
           <p>{articles.author}</p>
           <p className="article__Time">{articles.publishedAt}</p>
           </div>
           <p>{truncate(articles.content,200)}</p>
           <a className="more" href={articles.url}>
           <button className="more__btn">Read More..</button>
           </a>
         </div>
       )
     })):(resetInput())
   }   
   </div>
   </div>
  );
}

export default App;
