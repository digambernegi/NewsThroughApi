import React,{useState,useEffect} from 'react'
import './App.css';

function App() {
  const[input,setInput] = useState('Technology');
  const [article,setArticle]=useState([])

  function readValue(value){
    setInput(value);
  }
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  useEffect(() => {
      getNews();
  }, [input])

  function getNews(){
    fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=88b5ed72a3e543f9a116a1633f92885e`)
    .then((response)=> response.json())
    .then((data)=>{
      setArticle(data.articles);
      console.log(data.articles)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="app">
    <h1>News</h1>
    <div className="search">
    <input type="text" onChange={(e) =>{readValue(e.target.value)}} placeholder="category"/>
    <button onClick={getNews}>Submit</button>
    </div>
    
   <div className="wrapper">
   {
     article.map((articles,index) =>{
       return(
         <div key={index} className="cards">
           <img src={articles.urlToImage} alt="img-src" />
           <h3>{articles.title}</h3>
           
           <div className="author">
           <p>{articles.author}</p>
           <p className="article__Time">{articles.publishedAt}</p>
           </div>
           <p>{truncate(articles.content,200)}</p>
           <a href={articles.url}>
           <button className="more__btn">Read More</button>
           </a>
         </div>
       )
     })
   }  
   
   </div>
    </div>
  );
}

export default App;
