import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user data:", error));
  }, [userId]);

  if (!user) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <div className="d-flex align-items-center">
          <img src={user.profilePicture} alt="Profile" className="rounded-circle me-3" style={{ width: "80px", height: "80px" }} />
          <div>
            <h3>{user.username}</h3>
            <p>{user.bio}</p>
            <div>
              <span className="me-3">Followers: {user.followers.length}</span>
              <span>Following: {user.following.length}</span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-primary me-2">Follow</button>
          <button className="btn btn-outline-secondary">Message</button>
        </div>
      </div>
      
      <h4 className="mt-4">Books Available for Lending</h4>
      <div className="row">
        {user.books.map((book) => (
          <div className="col-md-6 mb-4" key={book._id}>
            <div className="card p-3 shadow-sm">
              <div className="d-flex">
                <div className="me-3">
                  {book.images.map((img, index) => (
                    <img key={index} src={img} alt={book.title} className="mb-2" style={{ width: "100px", height: "120px" }} />
                  ))}
                </div>
                <div>
                  <h5>{book.title}</h5>
                  <p>⭐ {book.rating}</p>
                  <p>{book.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;