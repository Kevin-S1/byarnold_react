import '../css/admin.css'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from '../Firebase';
import { useEffect, useState, useRef } from 'react';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, query, where, deleteDoc, doc, setDoc } from "firebase/firestore";

function Admin() {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [failMessage, setFailMessage] = useState(false);
    const [user, setUser] = useState(''); 
    const didMountRef = useRef(false);
    const [images, setImages] = useState([]);

    const getImages = async () => {
      const querySnapshot = await getDocs(collection(db, "gallery-items"))
      .then(snapshot => snapshot.forEach((doc) => {
        setImages(prev => [...prev, doc.data()]);
      }));
    }

    const deleteHandler = async (e, image) => {
      const mainPhoto = image.mainPhoto;
      const uploadDate = image.uploadDate;
      const q = query(collection(db, "gallery-items"), where("mainPhoto", "==", mainPhoto), where("uploadDate", "==", uploadDate));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (docs) => {
        await deleteDoc(doc(db, "gallery-items", docs.id));
      })
      setTimeout(() => {
        window.location.reload();
      }, 500)
      
    }

    const loginHandler = (e) => {
        e.preventDefault();
        if(e.target[0].value === 'arnold@byarnold.com' || e.target[0].value === 'kevinsips@protonmail.com') {
          signInWithEmailAndPassword(auth, e.target[0].value, e.target[1].value).then((userCredentials) => setUser(userCredentials.user.email))
          console.log(user);
        }
    }

    const singleFileHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
      if(e.target[0].files[0] === '' || e.target[0].files[0] === undefined) {setFail(!fail); setLoading(false); return;}
      const id = "id" + Math.random().toString(16).slice(2)
      let mainDownloadUrl = '';

      const firstStorageRef = ref(storage, e.target[0].files[0].name );

      const firstSnapshot = await uploadBytes(firstStorageRef, e.target[0].files[0]);
      mainDownloadUrl = await getDownloadURL(firstSnapshot.ref);

      await setDoc(doc(db, "gallery-items", id), {
        mainPhoto: mainDownloadUrl.toString(),
        type: 'single-image',
        uploadDate: new Date()
      });
      setLoading(false);
      setSuccess(!success);
      setTimeout(() => {
        window.location.reload();
      }, 500)
    }

    const multipleFileHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
      if(e.target[0].value === '' || e.target[0].value === undefined) { setFail(!fail); setLoading(false); return;}
      if(e.target[2].files[0] === '' || e.target[2].files[0] === undefined) {setFail(!fail); setLoading(false); return;}
      const id = "id" + Math.random().toString(16).slice(2)
      let mainDownloadUrl = '';
      let secondDownloadUrl = '';
      let thirdDownloadUrl = '';
      let fourthDownloadUrl = '';
      let fifthDownloadUrl = '';

      const storageRef = ref(storage, e.target[2].files[0].name);
      const firstSnapshot = await uploadBytes(storageRef, e.target[2].files[0]);
      mainDownloadUrl = await getDownloadURL(firstSnapshot.ref);

      try {
        const secondStorageRef = ref(storage, e.target[3].files[0].name);
        const secondSnapshot = await uploadBytes(secondStorageRef, e.target[3].files[0]);
        secondDownloadUrl = await getDownloadURL(secondSnapshot.ref);
      } catch (error) {
        console.log(error)
      }

      try {
        const secondStorageRef = ref(storage, e.target[4].files[0].name);
        const thirdSnapshot = await uploadBytes(secondStorageRef, e.target[4].files[0]);
        thirdDownloadUrl = await getDownloadURL(thirdSnapshot.ref);
      } catch (error) {
        console.log(error)
      }

      try {
        const secondStorageRef = ref(storage, e.target[5].files[0].name);
        const fourthSnapshot = await uploadBytes(secondStorageRef, e.target[5].files[0]);
        fourthDownloadUrl = await getDownloadURL(fourthSnapshot.ref);
      } catch (error) {
        console.log(error)
      }

      try {
        const secondStorageRef = ref(storage, e.target[6].files[0].name);
        const fifthSnapshot = await uploadBytes(secondStorageRef, e.target[6].files[0]);
        fifthDownloadUrl = await getDownloadURL(fifthSnapshot.ref);
      } catch (error) {
        console.log(error)
      }
      
      await setDoc(doc(db, "gallery-items", id), {
        title: e.target[0].value,
        description: e.target[1].value,
        mainPhoto: mainDownloadUrl.toString(),
        secondPhoto: secondDownloadUrl.toString(),
        thirdPhoto: thirdDownloadUrl.toString(),
        fourthPhoto: fourthDownloadUrl.toString(),
        fifthPhoto: fifthDownloadUrl.toString(),
        uploadDate: new Date(),
        type: 'image-set',
      });

      console.log('Successfully uploaded file')
      setLoading(false);
      setSuccess(!success);
      setTimeout(() => {
        window.location.reload();
      }, 500)
    }

    useEffect(() => {
      if(didMountRef.current) {
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false)
        }, 5000)
      }
    }, [success])

    useEffect(() => {
      if(didMountRef.current) {
        setFailMessage(true);
        setTimeout(() => {
          setFailMessage(false)
        }, 5000)
      }
    }, [fail])

    setTimeout(() => {
      didMountRef.current = true;
    }, 500)

    useEffect(() => {
      getImages();
    }, [])

    return (
      <>
      {user === 'arnold@byarnold.com' || user === 'kevinsips@protonmail.com' ? 
        <></>
        : 
          <div className='login-container'>
            <form onSubmit={e => loginHandler(e)} className='login-form'>
              <label className='admin-form-label'>Email:</label>
              <input className='admin-form-input' type='text'></input>
              <label className='admin-form-label'>Wachtwoord:</label>
              <input className='admin-form-input' type='text'></input>
              <input className='admin-form-input admin-submit-button admin-submit-button_small' type='submit' value='Log In' ></input>
            </form>
          </div> }
      {user === 'arnold@byarnold.com' || user === 'kevinsips@protonmail.com' ?   
      <div className="admin">
        <div className='admin-left-menu'>
          <h4 className='admin-header-sub'>Upload losse foto</h4>
          {failMessage ? <div className='fail-box'>Upload niet gelukt! Check input.</div> : <></>}
          {successMessage ? <div className='success-box'>Upload gelukt! :)</div> : <></>}
          <p>Upload hier een losse foto, deze wordt bovenaan de gallerij getoond.</p>
          {loading ? <div className='loading-box'>Uploaden...</div> : <form onSubmit={e => singleFileHandler(e)} className='admin-form'>
            <label className='admin-form-label' htmlFor='singleImage'>Foto:</label>
            <input className='admin-form-input' type='file' id='singleImage'></input>
            <input type="submit" className='admin-submit-button' value='Uploaden'></input>
          </form> }
        </div>
        <div className='admin-right-menu'>
          <h4 className='admin-header-sub'>Upload meerdere foto's</h4>
          {failMessage ? <div className='fail-box'>Upload niet gelukt! Check input.</div> : <></>}
          {successMessage ? <div className='success-box'>Upload gelukt! :)</div> : <></>}
          <p>Upload hier meerdere foto's met een titel en beschrijving.</p>
          {loading ? <div className='loading-box'>Uploaden...</div> : 
          <form className='admin-form' onSubmit={e => multipleFileHandler(e)}>
            <label className='admin-form-label' htmlFor='name'><b>Titel* (Verplicht):</b></label>
            <input id='name' className='admin-form-input' type='text' placeholder='Titel (Verplicht)'></input>
            <label className='admin-form-label' htmlFor='description'>Beschrijving:</label>
            <textarea id='description' className='admin-form-input' rows='10' cols='30' placeholder='Beschrijving (Optioneel)' ></textarea>
            <label htmlFor='image1'><b>1e foto* (Verplicht)</b></label>
            <input type="file" id="image1" name="filename"></input>
            <label htmlFor='image2'>2e foto</label>
            <input type="file" id="image2" name="filename"></input>
            <label htmlFor='image2'>3e foto</label>
            <input type="file" id="image2" name="filename"></input>
            <label htmlFor='image2'>4e foto</label>
            <input type="file" id="image2" name="filename"></input>
            <input type="submit" className='admin-submit-button' value='Uploaden'></input>
          </form> }
        </div>
        <div className='admin-overview-menu'>
          <h4 className='admin-header'>Foto's in Gallerij</h4>
          {images.map((image) => 
          <div className='admin-overview-item'>
            <img className='admin-overview-image' src={image.mainPhoto}/>
            <div className='admin-overview-text-container'>
              <h6>{image.title}</h6>
              <p className='admin-overview-description'>{image.description}</p>
              <h6 className='text-bold-small'>{image.type}</h6>
              <h6 className='text-bold-small'>{new Date(image.uploadDate * 1000).toISOString()}</h6>
              <button onClick={(e => deleteHandler(e, image))} className='delete-button'>VERWIJDER</button>
            </div>
          </div>)}
        </div>
      </div> :
      <></>}
      
      
      </>
    );
  }
  
  export default Admin;