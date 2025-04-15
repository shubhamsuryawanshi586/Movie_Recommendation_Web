import React, { useEffect, useState } from 'react';
import MovieService from '../services/MovieService';
import { Link } from 'react-router-dom';
import './css/AdminDashboard.css';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await MovieService.getAllMovies();
    setMovies(res.data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if (confirmDelete) {
      await MovieService.deleteMovie(id);
      fetchMovies();
    }
  };

  // Filtered movies based on search term
  const filteredMovies = movies.filter(m =>
    m.movie_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='admindashboard'>
      <div className="container-fluid px-3 py-4">
        <h2 className="mb-4">Admin Dashboard</h2>

        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <Link className="btn btn-success" to="/admin/add">Add Movie</Link>
          <input
            type="text"
            className="form-control" style={{width:'90%'}}
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Director</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.length > 0 ? (
                filteredMovies.map(m => (
                  <tr key={m.movie_id}>
                    <td>{m.movie_title}</td>
                    <td>{m.movie_director_name}</td>
                    <td>{m.movie_category}</td>
                    <td>
                      <div className="d-grid gap-2 d-md-flex">
                        <Link className="btn btn-sm btn-primary" to={`/admin/edit/${m.movie_id}`}>
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(m.movie_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No movies found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
