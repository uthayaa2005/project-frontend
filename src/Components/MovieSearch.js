
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiHeart, BiHome, BiSolidCameraMovie, BiUser } from "react-icons/bi";


const dummyData = [
    {
        Title: "Ishq",
        Year: "1997",
        imdbID: "tt0133024",
        Poster: "https://m.media-amazon.com/images/M/MV5BZDg3YWUwYzQtMWU3MS00MDYyLTg3ZGItNTJiMTQ3NDVhNmMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
    },
    {
      Title: 'Jumanji: Welcome to the Jungle',
      Year: '2017',
      imdbID: 'tt2283362',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV5BODQ0NDhjYWItYTMxZi00NTk2LWIzNDEtOWZiYWYxZjc2MTgxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
    },
   
    {
      Title: 'Resident Evil: Welcome to Raccoon City',
      Year: '2021',
      imdbID: 'tt6920084',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV5BNjA5NmZkMTYtM2I2Mi00NzJkLWJhZGItOGZhMzE0YTViZDMxXkEyXkFqcGdeQXVyNTA3MTU2MjE@._V1_SX300.jpg'
    },
    {
      Title: 'Premalu',
      Year: '2024',
      imdbID: 'tt28288786',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV5BYzFmODBhMjQtNjE0ZC00ZjczLTg5ZjktNTZhYzA0YmVkNzZjXkEyXkFqcGdeQXVyMTYwMjkzMjkx._V1_SX300.jpg'
    },
     {
      Title: 'Hindi Medium',
      Year: '2017',
      imdbID: 'tt5764096',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV5BY2E4NWQ4ZjEtNThlOC00NThjLThmZjgtMWU0MDgzMmYwOGU3XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg'
    },
    {
      Title: 'Trend Beacons',
      Year: '2014',
      imdbID: 'tt4254568',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV5BY2U4YTA5YjktNDg3MS00ZTg2LTk4ZmUtZGJiNzIyMGRmZDBkXkEyXkFqcGdeQXVyNjU0NjU0MzM@._V1_SX300.jpg'
    },
      {
      Title: 'Jilla',
      Year: '2014',
      imdbID: 'tt2678948',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV5BZWU2NzFmODEtYTE4YS00NGVkLWEyNTYtOGRhODk2Y2ZmOWE4XkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_SX300.jpg'
    },
     {
      Title: 'Asur: Welcome to Your Dark Side',
      Year: '2020–',
      imdbID: 'tt11912196',
      Type: 'series',
      Poster: 'https://m.media-amazon.com/images/M/MV5BNjczODVjMmMtNTVlNy00MjlkLWEyZjYtOThiYzMwZmIyNWZkXkEyXkFqcGdeQXVyMTY0NjI3Mjcx._V1_SX300.jpg'
    },
    {
        Title: "The Dark Knight",
        Year: "2008",
        imdbID: "tt0468569",
        Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg"
    }
];



const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState(dummyData);
    const [error, setError] = useState('');
    const [favorites, setFavorites] = useState();

    const backendUrl = process.env.REACT_BACKEND_URL;
    

    const navigate = useNavigate();
  
    const searchMovie = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not authenticated');
            return;
        }

        try {
            const resp = await fetch(`${backendUrl}/api/search?name=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!resp.ok) {
                throw new Error('Movie not found');
            }

            const data = await resp.json();
            setMovies(data.Search || []);
            setError('');

        } catch (error) {
            console.error(error);
            setError(error.message);
            setMovies([]);
        }
    }

    const addToFavorites = async (movie) => {
         const token = localStorage.getItem('token');
        if (!token) {
            setError('User not authenticated');
            return;
        }
        console.log(JSON.stringify(movie));
        try {
            const resp = await fetch(`http://localhost:5000/api/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(movie)
            });
            alert("Added to Favorites!");
        }
        catch(error) {
            console.error(error);
        }
    }
    
    const handlesignout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
      {/* Header */}
            
         <div className='bg-warning p-3 d-flex justify-content-between align-items-center'>
            <h1 className="d-flex align-items-center">
                <BiSolidCameraMovie size={60} className='me-2' /> CineSearch
            </h1>
            <div className='d-flex align-items-center'>
                <div
                    className='d-flex align-items-center me-3'
                    style={{ cursor: 'pointer' }}
                    
                >
                    <BiHome size={30} className='me-2' />
                    <span>Home</span>
                </div>
                <div
                    className='d-flex align-items-center me-3'
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/favorite')}
                >
                    <BiHeart size={30} className='me-2' />
                    <span>Favorites</span>
                </div>
                <div
                    className='d-flex align-items-center'
                    style={{ cursor: 'pointer' }}
                    onClick={(handlesignout)}
                >
                    <BiUser size={30} className='me-2' />
                    <span>Sign Out</span>
                </div>
            </div>
            </div>
            <div className='bg-dark min-vh-100'>
                <div className="container bg-dark text-white">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                          <h3 className="text-center mb-4 mt-4">Search your Favorite Movie</h3>
                            <div className="input-group mb-3">
                                <input
                                    type='text'
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="form-control"
                                    placeholder='Search for a movie'
                                />
                                <button onClick={searchMovie} className="btn btn-outline-dark bg-warning text-black ml-2">Search</button>
                           </div>
                        </div>
                    </div>

            {movies.length > 0 && (
                <div className="row mt-4">
                    {movies.map((movie, index) => (
                        <div key={index} className="col-lg-6">
                            <div className="card mb-3">

                                <div className="row g-0">

                                    <div className="col-md-4">
                                        <img src={movie.Poster} className="img-fluid rounded-start" alt={movie.Title} />
                                    </div>

                                    <div className="col-md-8 bg-dark text-white">
                                        <div className="card-body " >
                                            <h5 className="card-title">{movie.Title}</h5>
                                            <p className="card-text">Year: {movie.Year}</p>
                                            <BiHeart size={30} className='me-2' onClick={() => addToFavorites(movie)}/>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="text-danger text-center">{error}</p>}
        </div>
        </div>
            
    </>
    );
}

export default MovieSearch;
