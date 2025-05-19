import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TravelBlog() {
  const [travelPosts, setTravelPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetching data from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setTravelPosts(response.data);
      } catch (error) {
        console.error("Error fetching travel posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="component" style={{ margin: "20px" }}>
      <nav className="navbar-categories" style={{ textAlign: "center" }}>
        <h1>Travel Blog</h1>
      </nav>
      <br />

      {selectedPost ? (
        <div
          className="card"
          style={{
            backgroundColor: "rgba(129, 47, 134, 0.1)",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.description}</p>

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.9em",
              color: "#555",
              borderTop: "1px solid #ddd",
              paddingTop: "10px",
            }}
          >
            <span>✍️ <strong>Author:</strong> {selectedPost.author}</span>
            <span>📅 <strong>Date:</strong> {new Date(selectedPost.date).toLocaleDateString()}</span>
          </div>

          <button onClick={() => setSelectedPost(null)}>Back</button>
        </div>
      ) : (
        <div
          className="categories"
          style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}
        >
          {travelPosts.map((post) => (
            <div
              key={post.id}
              className="card"
              onClick={() => setSelectedPost(post)}
              style={{
                backgroundColor: " rgba(129, 47, 134, 0.1)",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                width: "48%",
              }}
            >
              <h3>{post.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
