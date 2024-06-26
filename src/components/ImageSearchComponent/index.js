import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { FidgetSpinner } from 'react-loader-spinner';


const ImageSearch = () => {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (searchQuery) {
      fetchImages(searchQuery);
    }
  }, [searchQuery]);

  const fetchImages = async (searchQuery) => {
    setLoading(true);
    setError('');

    try {
      const apikey = `tF914_18ls1qqSBbA1GpPSt4Haq2bGrqwV2NItnlAdA`;
      const response = await axios.get(`https://api.unsplash.com/search/photos?client_id=${apikey}&query=${searchQuery}`);
      setImages(response.data.results);
      console.log(response.data);
      setQuery('');
    } catch (err) {
      setError('Failed to fetch images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (query.trim()) {
      setSearchQuery(query);
    } else {
      alert('Please enter a search term.');
    }
  };

  return (
    <div className="image-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
        />
        <button type="submit" className='search-button'>Search</button>


        <div className='buttons-con'>
       
       <button onClick={(e) => setQuery('Mountains')}>Mountains</button>
       <button onClick={(e) => setQuery('Trees')}>Trees</button>
       <button onClick={(e) => setQuery('Beaches')}>Beaches</button>
       <button onClick={(e) => setQuery('Animals')}>Animals</button>
      
     </div>
      </form>
     

      {loading && (
        <div className='loading-con'>
          <FidgetSpinner
            visible={true}
            height="80"
            width="80"
            ariaLabel="fidget-spinner-loading"
            wrapperStyle={{}}
            wrapperClass="fidget-spinner-wrapper"
          />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
      <h1 className='search-heading'>{searchQuery}</h1>

      {images.length > 0 && (
        
        <div className="image-grid">
          
          {images.map((image) => (
            <div key={image.id} className="image-container">
              <img src={image.urls.small} alt={image.alt_description} />
              <div className="image-popup">
                <p className='desc'>{image.alt_description}</p>
                <p>{image.user.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
       
    </div>
  );
};

export default ImageSearch;
