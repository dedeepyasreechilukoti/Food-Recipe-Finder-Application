import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import Products from './products';

function Home() {
  const APP_ID = "cfdd3433";
  const APP_KEY = "16b9b88d3d3a20cd2ebbd48b1b43212d";
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const navigator = useNavigate()
  console.log(isLoading)

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    const searchText = localStorage.getItem('search_item')
    getSearchData(searchText)
  }

  const getSearchData = async (searchText) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.edamam.com/search?q=${searchText}&app_id=${APP_ID}&app_key=${APP_KEY}&form=0&to12`);
      const data = await response.json();
      setData(data.hits);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    
  };
  

  const submitHandler = (e) => {
    e.preventDefault();
    getSearchData(search)
    localStorage.setItem('search_item', search)
  };

  const logout = () => {
    navigator('/login')
  }

  if (isLoading) {
    return (
       <div className='loader-container'>
            <h1 className='loader-text'>Loading.....</h1>
            </div>
    )
  }

  return (
    <div className="home-container">
      <div className='header-container'>
      <h1 className='header-text'>Food Recipe Application</h1>
      <div className='btn-container'>
      <button className='btn' onClick={refreshData}>Refresh</button>
      <button className='btn-logout' onClick={logout}>Logout</button>
      </div>
      </div>
      <form className="form-container" onSubmit={submitHandler}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Please enter your favorite foods"
        />
        <input type="submit" value="Search" />
      </form>
      {data.length >= 1 && <Products data={data} />}
    </div>
  );
}

export default Home;
