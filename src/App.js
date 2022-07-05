import React, {useState, useEffect} from 'react';

const App = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react");
  const [url, setUrl] = useState("http://hn.algolia.com/api/v1/search?query=react");
  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true)
    fetch(url)
    .then(result => result.json())
    .then(data => (setNews(data.hits), setLoading(false)))
    .catch(error => console.log(error));
  };
  
  useEffect(() => {
    fetchNews()
  }, [url]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }

  const showLoading = () => (
    loading?<h2>Loading...</h2>  : ""
  )

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchQuery} onChange={handleChange}/>
      <button>Search</button>
    </form>
  )

  const showNews = () => (news.map((n, index) => (<p key={index}>{n.title}</p>)))

  return (
    <div>
      <h1>News</h1>
      {searchForm()}
      {showLoading()}
      {showNews()}
    </div>
  )
}

export default App;