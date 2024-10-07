import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './View.css';

const View = () => {
  const [record, setRecords] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecord = JSON.parse(localStorage.getItem('corse')) || [];
    setRecords(storedRecord);
    setFilterData(storedRecord);
  }, []);

  // Delete single record
  const deleteUser = (id) => {
    const updatedRecords = record.filter((val) => val.id !== id);
    localStorage.setItem('corse', JSON.stringify(updatedRecords));
    toast.error("Record deleted successfully...");
    setRecords(updatedRecords);
    setFilterData(updatedRecords);
  };

  // Filter records by search term (title, author, etc.)
  const filteredRecords = filterData.filter((val) => {
    const title = val.title ? val.title.toLowerCase() : '';
    const auther = val.auther ? val.auther.toLowerCase() : '';
    const date = val.date ? val.date.toLowerCase() : '';
    const genre = val.genre ? val.genre.toLowerCase() : '';
    const borrow = val.borrow ? val.borrow.toLowerCase() : '';
    
    return title.includes(searchTerm.toLowerCase()) || auther.includes(searchTerm.toLowerCase()) || date.includes(searchTerm.toLowerCase()) || genre.includes(searchTerm.toLowerCase()) || borrow.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col-lg-12">
            {/* Search input field */}
            <input 
              type="text"
              className="form-control mb-4"
              placeholder="Search by title, author, date, genre, or borrow status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
        </div>

        <div className="row">
          {filteredRecords.length === 0 && (
            <p className="text-center">No records found.</p>
          )}
          <div className=" col-lg-12 d-flex flex-wrap mx-auto mb-3">
            <div className="box ps-2 col-lg-3 me-4" style={{borderRadius:'8px'}}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA59bs4dOdDBYABN6D0Za40Xnt4lYn1kXY1A&s" className='  mt-2 mb-2' style={{ maxHeight: '200px', width: '95%', backgroundSize:'cover', }} alt="" />
              <h5 className="card-subtitle mb-2">Title: To Kill a Mockingbird </h5>
                  <h6 className="card-title text-capitalize">Author: Harper Lee </h6>        
                  <h6 className="card-title text-capitalize">Genre:  Southern Gothic, Bildungsroman </h6>  
                  <h6 className="card-title text-capitalize">Book Status: Borrow</h6> 
                  <p className="card-text">Date: July 11, 1960 </p> 
            </div>

            <div className="box ps-2 col-lg-3 me-4" style={{borderRadius:'8px'}}>
              <img src="https://rukminim2.flixcart.com/image/850/1000/xif0q/book/m/i/d/1984-original-imaguysp6hrnmmfm.jpeg?q=20&crop=false" className='  mt-2 mb-2' style={{ maxHeight: '200px', width: '95%', backgroundSize:'cover', }} alt="" />
              <h4 className="card-subtitle mb-2">Title: 1984 </h4>
                  <h6 className="card-title text-capitalize">Author:George Orwell </h6>        
                  <h6 className="card-title text-capitalize">Genre: Dystopian, Political Fiction, Social Science Fiction </h6>  
                  <h6 className="card-title text-capitalize">Book Status: Return</h6> 
                  <p className="card-text">Date: June 8, 1949 </p> 
            </div>

            <div className="box ps-2 col-lg-3 me-4" style={{borderRadius:'8px'}}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPOYAiRgJln85ERNHCE2hrhdnoYzmQZd1uew&s" className='  mt-2 mb-2' style={{ maxHeight: '200px', width: '95%', backgroundSize:'cover', }} alt="" />
              <h4 className="card-subtitle mb-2">Title: The Great Gatsby</h4>
                  <h6 className="card-title text-capitalize">Author: F. Scott Fitzgerald </h6>        
                  <h6 className="card-title text-capitalize">Genre: Tragedy, Historical Fiction, Social Criticism</h6>  
                  <h6 className="card-title text-capitalize">Book Status: return</h6>
                  <p className="card-text">Date:  April 10, 1925 </p> 
            </div>
          </div>
          {filteredRecords.map((val, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="box card h-100">
                <div className="card-body">
                  
                  {/* Display Book Image */}
                  {val.image && (
                    <div className="image-container mb-3">
                      <img 
                        src={val.image} 
                        alt={val.title} 
                        className="img-fluid" 
                        style={{ maxHeight: '200px', width: '100%', backgroundSize:'cover' }} 
                      />
                    </div>
                  )}

                  {/* Title and Details */}
                  <h4 className="card-subtitle mb-2">Title: {val.title}</h4>
                  <h6 className="card-title text-capitalize">Author: {val.auther}</h6>        
                  <h6 className="card-title text-capitalize">Genre: {val.genre}</h6>  
                  <h6 className="card-title text-capitalize">Book Status: {val.borrow}</h6> 
                  <p className="card-text">Date: {val.date}</p> 

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-danger btn-sm" onClick={() => deleteUser(val.id)}>Delete</button>
                    <button className="btn btn-success btn-sm" onClick={() => navigate("/edit", { state: val })}>Edit</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

export default View;
