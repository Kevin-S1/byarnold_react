import './App.css';
import About from './Components/About';
import Gallery from './Components/Gallery';
import Home from './Components/Home';
import Admin from './Components/Admin';
import Contact from './Components/Contact';
import NavBar from './Components/NavBar';
import { db, app } from './Firebase';
import { Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";

function App() {

  const [images, setImages] = useState([])

  const getImages = async () => {
    const querySnapshot = await getDocs(collection(db, "gallery-items"))
    .then(snapshot => snapshot.forEach((doc) => {
      setImages(prev => [...prev, doc.data()]);
    }));
  }

  useEffect( async () => {
    await getImages();
  }, [])

  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/admin' element={ <Admin images={ images }/> } ></Route>
        <Route path='/gallery' element={ <Gallery images={ images }/> } ></Route>
        <Route path='/contact' element={ <Contact /> }></Route>
        <Route path='/about' element={ <About /> }></Route>
        <Route path='/' element={ <Home /> }></Route>
      </Routes>
      <Footer />
    
    </>
  );
}

export default App;
