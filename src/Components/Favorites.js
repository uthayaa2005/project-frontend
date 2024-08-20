import React, { useEffect, useState } from 'react';
import { BiHeart, BiHome, BiSolidCameraMovie, BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function Favorite() {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState('');

    const backendUrl = process.env.REACT_BACKEND_URL;

    const navigate = useNavigate();

    const fetchFavorites = async () => {
          const token = localStorage.getItem('token');
        if (!token) {
            setError('User not authenticated');
            return;
        }
        try {
            const resp = await fetch(`${backendUrl}/api/favorite`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!resp.ok) {
                throw new Error('Failed to fetch favorites');
            }

            const data = await resp.json();
            setFavorites(data);

        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const handlesignout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
             {/* Header */}
      <div className='bg-dark min-vh-100'>
       <div className='bg-warning p-3 d-flex justify-content-between align-items-center'>
            <h1 className="d-flex align-items-center">
                <BiSolidCameraMovie size={60} className='me-2' /> CineSearch
            </h1>
            <div className='d-flex align-items-center'>
                <div
                    className='d-flex align-items-center me-3'
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/home')}
                >
                    <BiHome size={30} className='me-2' />
                    <span>Home</span>
                </div>
                <div
                    className='d-flex align-items-center me-3'
                    style={{ cursor: 'pointer' }}
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
      
        
              
                <h2 className='text-white text-center mb-4 mt-4'>Your Favorites! <BiHeart></BiHeart></h2>

                <div className='container bg-dark text-white'>
                    {error && <p className="text-danger">{error}</p>}
            <div className="row bg-dark">
                {favorites.map((fav, index) => (
                    <div key={index} className="col-lg-6">
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={JSON.parse(fav.movie).Poster} className="img-fluid rounded-start" alt={JSON.parse(fav.movie).Title} />
                                </div>
                                <div className="col-md-8 bg-dark text-white">
                                    <div className="card-body">
                                        <h5 className="card-title">{JSON.parse(fav.movie).Title}</h5>
                                        <p className="card-text">Year: {JSON.parse(fav.movie).Year}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
                </div>
            
        </div>

        </>
    );
}

export default Favorite;