
import { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from '../Firebase';
import '../css/edit.css';


function Edit({image}) {
    const didMountRef = useRef(false);
    const [update, setUpdate] = useState(false);

    const [title, setTitle] = useState(image.title);
    const [description, setDescription] = useState(image.description);
    const [mainPhoto, setMainPhoto] = useState('');
    const [secondPhoto, setSecondPhoto] = useState('');
    const [thirdPhoto, setThirdPhoto] = useState('');
    const [fourthPhoto, setFourthPhoto] = useState('');

    const [mainPhotoURL, setMainPhotoURL] = useState(image.mainPhoto);
    const [secondPhotoURL, setSecondPhotoURL] = useState(image.secondPhoto);
    const [thirdPhotoURL, setThirdPhotoURL] = useState(image.thirdPhoto);
    const [fourthPhotoURL, setFourthPhotoURL] = useState(image.fourthPhoto);

    const uploadFile = async () => {
      if(image.type === 'single-image') {
        const firstStorageRef = ref(storage, mainPhoto.name );
        const firstSnapshot = await uploadBytes(firstStorageRef, mainPhoto);
        await setDoc(doc(db, "gallery-items", image.id), {
          mainPhoto: await getDownloadURL(firstSnapshot.ref),
          type: image.type,
          uploadDate: image.uploadDate
        });
        return;
      }

      await setDoc(doc(db, "gallery-items", image.id), {
        id: image.id,
        title: title,
        description: description,
        mainPhoto: mainPhotoURL.toString(),
        secondPhoto: secondPhotoURL.toString(),
        thirdPhoto: thirdPhotoURL.toString(),
        fourthPhoto: fourthPhotoURL.toString(),
        type: image.type,
        uploadDate: image.uploadDate
      });
    }

    const saveHandler = async (e) => {
      e.preventDefault();
      if (image.type === 'single-image' && mainPhoto !== '') {
        await uploadFile();
        return;
      }

      console.log(thirdPhoto);
      console.log(fourthPhoto);

      if(mainPhoto !== '') {
        const firstStorageRef = ref(storage, mainPhoto.name );
        const firstSnapshot = await uploadBytes(firstStorageRef, mainPhoto);
        setMainPhotoURL(await getDownloadURL(firstSnapshot.ref));
      }
      if(secondPhoto !== '') {
        const secondStorageRef = ref(storage, secondPhoto.name );
        const secondSnapshot = await uploadBytes(secondStorageRef, secondPhoto);
        setSecondPhotoURL(await getDownloadURL(secondSnapshot.ref));
      }
      if(thirdPhoto !== '') {
        const thirdStorageRef = ref(storage, thirdPhoto.name );
        const thirdSnapshot = await uploadBytes(thirdStorageRef, thirdPhoto);
        setThirdPhotoURL(await getDownloadURL(thirdSnapshot.ref));
      }
      if(fourthPhoto !== '') {
        const fourthStorageRef = ref(storage, fourthPhoto.name );
        const fourthSnapshot = await uploadBytes(fourthStorageRef, fourthPhoto);
        setFourthPhotoURL(await getDownloadURL(fourthSnapshot.ref));
      }
      setUpdate(!update);
      return;
    }

    useEffect(() => {
      if (didMountRef.current) {
        uploadFile();
      }
    }, [update])

    setTimeout(() => {
      didMountRef.current = true;
    }, 500)

    return (
      <div className='edit-container'>
        {image.type === 'image-set' ? 
        <form className='edit-form'>
          <label>Titel:</label>
          <input className='edit-input' type='text' value={title} onChange={e => setTitle(e.target.value)}/>
          <label>Beschrijving:</label>
          <textarea rows={6} className='edit-input' type='text' value={description} onChange={e => setDescription(e.target.value)} />
        </form> : <></>}
        
        <div className='edit-images'>
            <label><b>1e Foto:</b></label>
            <img className='edit-image edit-image-main' src={mainPhotoURL}/>
            <input className='edit-input' type='file' onChange={e => setMainPhoto(e.target.files[0])} />
            {image.type === 'image-set' ?
            <>
              <label>2e Foto:</label>
              <img className='edit-image' src={secondPhotoURL}/>
              <input className='edit-input' type='file' onChange={e => setSecondPhoto(e.target.files[0])} />
              <label>3e Foto:</label>
              <img className='edit-image' src={thirdPhotoURL}/>
              <input className='edit-input' type='file' onChange={e => setThirdPhoto(e.target.files[0])} />
              <label>4e Foto:</label>
              <img className='edit-image' src={fourthPhotoURL}/>
              <input className='edit-input' type='file' onChange={e => setFourthPhoto(e.target.files[0])} />
            </>
            : <></>}
            
        </div>  
        <button className='admin-submit-button' onClick={e => saveHandler(e)}>Opslaan</button>
      </div>
    );
  }
  
  export default Edit;