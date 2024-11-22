import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Single = () => {
  const { id } = useParams(); // Extract id from route params
  const [singleMovie, setSingleMovie] = useState({}); // Movie details
  const [likes, setLikes] = useState(0); // Like count
  const [dislikes, setDislikes] = useState(0); // Dislike count
  const [comments, setComments] = useState([]); // Comment list
  const [userAction, setUserAction] = useState(null); // Track user action (like/dislike)
  const [newComment, setNewComment] = useState(''); // New comment text
  const [isFavorite, setIsFavorite] = useState(false); // Favorite state

  const getSingleData = async () => {
    try {
      const { data } = await axios.get(`https://www.omdbapi.com/?apikey=28a8e30b&i=${id}`);
      setSingleMovie(data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  // Load data from localStorage on mount
  useEffect(() => {
    if (id) getSingleData();

    const storedLikes = localStorage.getItem(`${id}-likes`);
    const storedDislikes = localStorage.getItem(`${id}-dislikes`);
    const storedComments = localStorage.getItem(`${id}-comments`);
    const storedUserAction = localStorage.getItem(`${id}-userAction`);
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    setLikes(storedLikes ? parseInt(storedLikes) : 0);
    setDislikes(storedDislikes ? parseInt(storedDislikes) : 0);
    setComments(storedComments ? JSON.parse(storedComments) : []);
    setUserAction(storedUserAction);
    setIsFavorite(storedFavorites.includes(id));
  }, [id]);

  // Handle Like
  const handleLike = () => {
    if (userAction === 'like') return;
    if (userAction === 'dislike') setDislikes(dislikes - 1);

    setLikes(likes + 1);
    setUserAction('like');
    localStorage.setItem(`${id}-likes`, likes + 1);
    localStorage.setItem(`${id}-userAction`, 'like');
  };

  // Handle Dislike
  const handleDislike = () => {
    if (userAction === 'dislike') return;
    if (userAction === 'like') setLikes(likes - 1);

    setDislikes(dislikes + 1);
    setUserAction('dislike');
    localStorage.setItem(`${id}-dislikes`, dislikes + 1);
    localStorage.setItem(`${id}-userAction`, 'dislike');
  };

  // Handle New Comment Submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setNewComment('');
    localStorage.setItem(`${id}-comments`, JSON.stringify(updatedComments));
  };

  // Handle Add/Remove Favorite
  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = storedFavorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...storedFavorites, id];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row g-4 align-items-center">
        <div className="col-12 col-md-4 text-center">
          <img
            src={singleMovie?.Poster || 'https://via.placeholder.com/300x450'}
            alt={singleMovie?.Title || 'Movie Poster'}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-12 col-md-8">
          <h1 className="text-light mb-3">{singleMovie?.Title || 'N/A'}</h1>
          <p className="text-light">{singleMovie?.Plot || 'N/A'}</p>
          <div className="row g-2">
            {/* Movie Details */}
            <div className="col-6">
              <p className="text-bold m-0">Actors:</p>
              <p className="text-light m-0">{singleMovie?.Actors || 'N/A'}</p>
            </div>
            <div className="col-6">
              <p className="text-bold m-0">Rating:</p>
              <p className="text-light">
                <i className="fa-solid fa-star text-warning"></i> {singleMovie?.imdbRating || 'N/A'}
              </p>
            </div>
            <div className="col-6">
              <p className="text-bold m-0">Awards:</p>
              <p className="text-light m-0">{singleMovie?.Awards || 'N/A'}</p>
            </div>
            <div className="col-6">
              <p className="text-bold m-0">Country:</p>
              <p className="text-light m-0">{singleMovie?.Country || 'N/A'}</p>
            </div>
            <div className="col-6">
              <p className="text-bold m-0">Language:</p>
              <p className="text-light m-0">{singleMovie?.Language || 'N/A'}</p>
            </div>
            <div className="col-6">
              <p className="text-bold m-0">Runtime:</p>
              <p className="text-light m-0">{singleMovie?.Runtime || 'N/A'}</p>
            </div>
          </div>

          {/* Like/Dislike Section */}
          <div className="mt-4">
            <button
              className={`btn me-2 ${userAction === 'like' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={handleLike}
            >
              👍 Like ({likes})
            </button>
            <button
              className={`btn ${userAction === 'dislike' ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={handleDislike}
            >
              👎 Dislike ({dislikes})
            </button>
            <button
              className={`btn ms-2 ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={toggleFavorite}
            >
              {isFavorite ? '★ Remove Favorite' : '☆ Add to Favorites'}
            </button>
          </div>

          {/* Comment Section */}
          <div className="mt-4">
            <h3 className="text-light">Comments</h3>
            <form onSubmit={handleCommentSubmit} className="d-flex mb-3">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <ul className="list-group">
              {comments.map((comment, index) => (
                <li key={index} className="list-group-item">
                  {comment}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
