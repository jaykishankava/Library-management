import React, { useState } from 'react';
import Header from '../Component/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Add.css';

const Add = () => {
    const [title, setTitle] = useState("");
    const [auther, setAuther] = useState("");
    const [date, setDate] = useState("");
    const [genre, setGenre] = useState("");
    const [borrow, setBorrow] = useState("");
    const [image, setImage] = useState(null); // Image state for uploaded image
    const navigation = useNavigate();

    const Getdata = () => {
        let data = JSON.parse(localStorage.getItem('corse')) || [];
        if (data) {
            return data;
        } else {
            return [];
        }
    };

    const [record, setRecord] = useState(Getdata());

    const handle = (e) => {
        e.preventDefault();

        if (!title || !auther || !date || !genre || !borrow || !image) {
            toast.error("All fields including the image are required.");
            return false;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            let obj = {
                id: Math.floor(Math.random() * 10000),
                title,
                date,
                auther,
                genre,
                borrow,
                image: reader.result, // Base64 image
            };

            let old = [...record, obj];
            localStorage.setItem('corse', JSON.stringify(old));
            toast.success("Successfully added Task");

            setTimeout(() => {
                navigation("/");
            }, 1000);

            // Reset form fields
            setTitle('');
            setDate('');
            setAuther('');
            setBorrow('');
            setGenre('');
            setImage(null); // Reset image
        };

        // Convert the uploaded image to Base64
        if (image) {
            reader.readAsDataURL(image);
        }
    };

    // Handle file input change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <div>
            <Header />

            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <form onSubmit={handle} className='bg border p-3 shadow bg-light'>
                            <h3 className='mb-3 text-center'>Create Book List</h3>

                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    value={title} 
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="auther" className="form-label">Auther</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(e) => setAuther(e.target.value)} 
                                    value={auther} 
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Publication Date</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    onChange={(e) => setDate(e.target.value)} 
                                    value={date} 
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="genre" className="form-label">Genre</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(e) => setGenre(e.target.value)} 
                                    value={genre} 
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Upload Image</label>
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    accept="image/*" 
                                    onChange={handleImageChange}
                                />
                            </div>

                            <div className="mb-3">
                                <div>
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="borrowOptions" 
                                            id="borrowOption1" 
                                            onChange={(e) => setBorrow("Borrow")} 
                                            checked={borrow === "Borrow"}
                                        />
                                        <label className="form-check-label" htmlFor="borrowOption1">
                                            Borrow
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="borrowOptions" 
                                            id="borrowOption2" 
                                            onChange={(e) => setBorrow("Return")} 
                                            checked={borrow === "Return"}
                                        />
                                        <label className="form-check-label" htmlFor="borrowOption2">
                                            Return
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn mx-auto d-block mt-4" style={{ backgroundColor: '#224254', color: 'white' }}>
                                Add Book's List
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Add;
