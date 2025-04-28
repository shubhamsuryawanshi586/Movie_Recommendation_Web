import React, { useEffect, useState } from 'react';
import MovieService from '../services/MovieService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './css/AdminDashboard.css';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 5;

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await MovieService.getAllMovies();
      setMovies(res.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      Swal.fire({
        title: 'Error',
        text: 'There was an error fetching the movie list.',
        icon: 'error',
        showConfirmButton: false,
      });
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this action!",
      icon: 'warning',
      position: 'top',
      minWidth: '300px',
      padding: '10px',
      toast: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (confirmDelete.isConfirmed) {
      try {
        await MovieService.deleteMovie(id);
        Swal.fire({
          text: 'The movie has been deleted.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          position: 'top',
          minWidth: '300px',
          padding: '10px',
          toast: true,
        });
        fetchMovies(); // Refresh the movie list after deletion
      } catch (error) {
        Swal.fire({
          text: 'There was an error deleting the movie.',
          icon: 'error',
          confirmButtonText: 'OK',
          position: 'top',
          minWidth: '300px',
          padding: '10px',
          toast: true,
        });
      }
    }
  };

  const filteredMovies = movies.filter((m) =>
    m.movie_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageNumbers = [];
    const range = 1;

    let startPage = 1;
    let endPage = Math.min(3, totalPages);

    if (currentPage > 1) {
      startPage = currentPage - range;
      endPage = currentPage + range;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination justify-content-center mt-3">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>
              Previous
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className='admindashboard' style={{ marginTop: '75px' }}>
      <div className="container-fluid px-3 py-4">
        

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link className="btn btn-success" to="/admin/add">Add Movie</Link>
          <input
            type="text"
            className="form-control"
            style={{ maxWidth: '65%' }}
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-responsive-md">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Director</th>
                <th>Category</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMovies.length > 0 ? (
                currentMovies.map((m) => (
                  <tr key={m.movie_id}>
                    <td>{m.movie_title}</td>
                    <td>{m.movie_director_name}</td>
                    <td>{m.movie_category}</td>
                    <td className="text-end">
                      <div className="d-grid gap-2 d-md-flex flex-column flex-md-row justify-content-end">
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


        {filteredMovies.length > moviesPerPage && renderPagination()}
      </div>
    </div>
  );
};

export default AdminDashboard;
