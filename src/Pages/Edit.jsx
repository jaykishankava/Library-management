import React, { useEffect, useState } from 'react'
import Header from '../Component/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import './Edit.css'
const Edit = () => {
    const [title, setTitle] = useState("");
    const [auther, setAuther] = useState("");
    const [date, setDate] = useState("")
    const [genre, setGenre] = useState("")
    const [borrow, setBorrow] = useState("")
        const navigation=useNavigate()

        let location=useLocation();
        


        const Getdata= () =>{
            let data=JSON.parse(localStorage.getItem('corse')) || [];
            if(data){
                return data;
            }else{
                return []
            }
        }
        const [record,setRecord]=useState(Getdata())

        
    
    const handle =(e) =>{
        e.preventDefault()

        if(!title || !auther || !date || !genre || !borrow ){
            toast.error("all filed reuired..");
            return false;
        }

        let up=record.map((val)=>{
          if(val.id == location.state.id){
            val.title=title,
            val.auther=auther,
            val.date=date;
            val.genre=genre;
            val.borrow=borrow;
          }
          return val;
        })
        

       
        localStorage.setItem('corse',JSON.stringify(up));
        toast.success("suceessfully add Update");

        setTimeout(()=>{
            navigation("/")
        },1000)
        setTitle('');
        setDate("");
        setAuther("");
        setBorrow("");
        setGenre("");

    }

    useEffect(()=>{
      setTitle(location.state.title);
      setAuther(location.state.auther);
      setDate(location.state.date);
      setGenre(location.state.genre);
      setBorrow(location.state.borrow);
    },[location])
    return (
        <div>
            <Header />

            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        
                        <form onSubmit={handle} className= ' bg border  p-3 shadow'>
                        <h3 className='mb-3 text-center'>Edit book list</h3>
                        <div className="mb-3">
                                <label htmlFor="name" className="form-label"> Title</label>
                                <input type="text" className="form-control" onChange={(e) =>  setTitle(e.target.value)} value={title} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Auther</label>
                                <input type="text" className="form-control" onChange={(e) => setAuther(e.target.value)} value={auther} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Publication date</label>
                                <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} value={date} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Genre</label>
                                <input type="text" className="form-control" onChange={(e) => setGenre(e.target.value)} value={genre} />
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
                            
                            <button type="submit" className="btn btn-primary mx-auto d-block mt-4">Update</button>
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
            transition: Bounce
            />

        </div>
    )
}

export default Edit
