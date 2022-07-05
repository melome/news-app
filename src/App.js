import React, {useState, useEffect} from 'react';

const App = () => {
  const [news, setNews] = useState([]);

  const fetchNews = () => {
    fetch("http://hn.algolia.com/api/v1/search?query=react")
    .then(result => result.json())
    .then(data => setNews(data.hits))
    .catch(error => console.log(error));
  };
  
  useEffect(() => {
    fetchNews()
  });

  return (
    <div>
      <h1>News</h1>
      {news.map((n, index) => (<p key={index}>{n.title}</p>))}
    </div>
  )
}

export default App;