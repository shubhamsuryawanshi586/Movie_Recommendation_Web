import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import AddEditMoviePage from './pages/AddEditMoviePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserRegisterPage from './pages/UserRegisterPage';
import AdminRegisterPage from './pages/AdminRegisterPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import MovieReview from './components/MovieReview';
import MovieRating from './components/MovieRating';
import Recommendations from './pages/Recommendations';
import Watchlist from './pages/Watchlist';
import MovieList from './pages/MovieList';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import ScrollToTop from './components/ScrollToTop';

const MovieApp = () => {
  return (
    <Router>
       <ScrollToTop/>
      <div className='box'>
        <Navbar />
        <div>
          {/* <SearchBar/> */}
         
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<UserRegisterPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/register" element={<AdminRegisterPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
           
            <Route path="/admin/add" element={<ProtectedRoute role="Admin"><AddEditMoviePage /></ProtectedRoute>} />
            <Route path="/admin/edit/:id" element={<ProtectedRoute role="Admin"><AddEditMoviePage /></ProtectedRoute>} />

            <Route path="/movies" element={<MovieList/>}/>
            <Route path="/movie/:id/review" element={<MovieReview />} />
            <Route path="/movie/:id/rating" element={<MovieRating />} />
            <Route path="/movie/recommendation" element={<Recommendations/>}/>
            <Route path="/movie/watchlist" element={<Watchlist/>}/>
            <Route path='/about' element={<AboutUs/>}/>
            <Route path='/contact' element={<Contact/>}/>
            
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default MovieApp;
