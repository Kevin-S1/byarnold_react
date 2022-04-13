
import { useEffect, useState, useRef } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from '../Firebase';
import { MdDeleteForever } from 'react-icons/md';
import { Modal, Button } from 'react-bootstrap';
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

    const [show, setShow] = useState(false);
    const [activeItem, setActiveItem] = useState();
    const [activePhoto, setActivePhoto] = useState();

    const handleClose = () => setShow(false);

    const handleShow = (image, imageNo) => {
      setActiveItem(image);
      setActivePhoto(imageNo);
      setShow(true);
    }

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

    const imageDeleteHandler = async (e, image, photoNo) => {
      e.preventDefault();
      switch (photoNo) {
        case 2 : {
          setSecondPhoto('');
          setSecondPhotoURL('');
          await setDoc(doc(db, "gallery-items", image.id), {
            id: image.id,
            title: title,
            description: description,
            mainPhoto: mainPhotoURL.toString(),
            secondPhoto: '',
            thirdPhoto: thirdPhotoURL.toString(),
            fourthPhoto: fourthPhotoURL.toString(),
            type: image.type,
            uploadDate: image.uploadDate
          });
          setUpdate(!update);
          break;
        }

        case 3 : {
          setThirdPhoto('');
          setThirdPhotoURL('');
          await setDoc(doc(db, "gallery-items", image.id), {
            id: image.id,
            title: title,
            description: description,
            mainPhoto: mainPhotoURL.toString(),
            secondPhoto: secondPhotoURL.toString(),
            thirdPhoto: '',
            fourthPhoto: fourthPhotoURL.toString(),
            type: image.type,
            uploadDate: image.uploadDate
          });
          setUpdate(!update);
          break;
        }
        case 4 : {
          setFourthPhoto('');
          setFourthPhotoURL('');
          await setDoc(doc(db, "gallery-items", image.id), {
            id: image.id,
            title: title,
            description: description,
            mainPhoto: mainPhotoURL.toString(),
            secondPhoto: secondPhotoURL.toString(),
            thirdPhoto: thirdPhotoURL.toString(),
            fourthPhoto: '',
            type: image.type,
            uploadDate: image.uploadDate
          });
          setUpdate(!update);
          break;
        }
      }
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
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title> Verwijder Foto.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {activePhoto === 2 ?
                  <img src={activeItem?.secondPhoto} width='50px'/> :
                  activePhoto === 3 ?
                  <img src={activeItem?.thirdPhoto} width='50px'/> :
                  <img src={activeItem?.fourthPhoto} width='50px'/>
                  }
                  <br></br>
                  Weet je zeker dat je deze foto wilt verwijderen?
                  Je kan dit niet ongedaan maken.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Nee, ga terug
                  </Button>
                  <Button variant="primary" onClick={e => imageDeleteHandler(e, activeItem, activePhoto)}>
                    Ja, Verwijder foto.
                  </Button>
                </Modal.Footer>
              </Modal>
              <label>2e Foto:</label>
              <div className='edit-image-container'>
                <img className='edit-image' src={secondPhotoURL}/>
                  {secondPhotoURL !== '' ? 
                      <button className='delete-image-button' onClick={() => handleShow(image, 2)}>
                        <MdDeleteForever />
                      </button>
                    :<></>}
                <input className='edit-input' type='file' onChange={e => handleShow(e.target.files[0])} />
              </div>
              <label>3e Foto:</label>
              <div className='edit-image-container'>
                <img className='edit-image' src={thirdPhotoURL}/>
                {thirdPhotoURL !== '' ? 
                  <button className='delete-image-button' onClick={() => handleShow(image,  3)}>
                    <MdDeleteForever />
                  </button>
                :<></>}
                <input className='edit-input' type='file' onChange={e => setThirdPhoto(e.target.files[0])} />
              </div>
              <label>4e Foto:</label>
              <div className='edit-image-container'>
                <img className='edit-image' src={fourthPhotoURL}/>
                {fourthPhotoURL !== '' ? 
                  <button className='delete-image-button' onClick={() => handleShow(image, 4)}>
                    <MdDeleteForever />
                  </button>
                :<></>}
                <input className='edit-input' type='file' onChange={e => setFourthPhoto(e.target.files[0])} />
              </div>
            </>
            : <></>}
        </div>  
        <button className='admin-submit-button' onClick={e => saveHandler(e)}>Opslaan</button>
      </div>
    );
  }
  
  export default Edit;