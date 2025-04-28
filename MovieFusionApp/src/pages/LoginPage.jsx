import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Swal from 'sweetalert2';

const LoginPage = () => {
    const [role, setRole] = useState('User'); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentAccount();
        if (user) {
            if (user.user_role_name === 'User') {
                navigate('/');
            } else if (user.user_role_name === 'Admin') {
                navigate('/admin/dashboard');
            }
        }
    }, [navigate]);

    const validateForm = () => {
        let isValid = true;
        // Reset errors
        setEmailError('');
        setPasswordError('');

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.match(emailRegex)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        }

        // Validate password length
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
            isValid = false;
        }

        // Ensure role is selected (although this is already ensured by the HTML 'required' attribute)
        if (!role) {
            isValid = false;
        }

        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const loginData = { email, password };

            let res;
            if (role === 'User') {
                res = await AuthService.userLogin(loginData); // Call user login API
            } else if (role === 'Admin') {
                res = await AuthService.adminLogin(loginData); // Call admin login API
            }

            await Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: `Welcome to Movie Fusion!`,
                timer: 1500,
                showConfirmButton: false,
                position: 'top',
                width: '350px',
                padding: '10px',
                toast: true,
                background: '#ffffff',
            });

            if (role === 'User') {
                navigate('/'); // Navigate to home page
            } else if (role === 'Admin') {
                navigate('/admin/dashboard'); // Navigate to admin dashboard
            }

        } catch (err) {
            console.error('Login error:', err);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Please check your email and password.',
                timer: 1500,
                position: 'top',
                width: '300px',
                padding: '10px',
                toast: true,
                background: '#ffffff',
                showConfirmButton: false,
            });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 mt-4 p-2">
            <div
                className="card p-3 shadow-lg"
                style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', background: '#ffffffee', transition: 'transform 0.3s ease' }}
            >
                <div className="text-center mb-4">
                    <h2 className="fw-bold">Login</h2>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <select
                            className="form-select rounded-3"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control rounded-3"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                            required
                        />
                        {emailError && <small className="text-danger">{emailError}</small>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="form-control rounded-3"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                        {passwordError && <small className="text-danger">{passwordError}</small>}
                    </div>
                    <button className="btn btn-primary w-100 rounded-3" type="submit">
                        Login
                    </button>
                </form>
                <div className="text-center mt-3">
                    <small className="text-muted">
                        Don't have an account?{' '}
                        <a href="/register" className="text-primary text-decoration-none">
                            Register
                        </a>
                    </small>
                </div>
                <div className="text-center mt-2">
                    <small className="text-muted">
                        Back to{' '}
                        <a href="/" className="text-primary text-decoration-none">
                            Homepage
                        </a>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
