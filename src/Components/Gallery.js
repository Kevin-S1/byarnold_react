import Carousel from 'react-bootstrap/Carousel'
import '../css/gallery.css'
import { useEffect, useState } from 'react';
import Fancybox from '../Fancybox';

function Gallery(props) {

    return (
        <>
            <div className='gallery-single-container'>
              {props.images.filter((image)=> image.type === 'single-image' ).map((image) => 
                  <Fancybox className='main-image-container' options={{ infinite: false }}>
                  <a
                      data-fancybox="responsive"
                      data-src={image.mainPhoto}
                      data-sizes="(max-width: 600px) 480px, 800px"
                      >
                      <img className='gallery-single-photo' src={image.mainPhoto} width="200" height="300" />
                  </a>              
                </Fancybox>
              )}
            </div>
            <div className='gallery-multiple-container-main'>
              {props.images.filter((image) => image.type === 'image-set').map((image) => 
                  <div className='gallery-multiple-container'>
                      <h4 className='image-title'>{image.title}</h4>
                      <Fancybox options={{ infinite: false }}>
                        <a
                            data-fancybox="responsive"
                            data-src={image.mainPhoto}
                            data-caption={image.description}
                            data-sizes="(max-width: 600px) 480px, 800px"
                            >
                            <img className='gallery-multi-main-photo' src={image.mainPhoto} />
                        </a>
                        <div className='image-set-secondary-container'>
                            {image.secondPhoto !== '' ? 
                            <a
                                data-fancybox="responsive"
                                data-src={image.secondPhoto}
                                data-sizes="(max-width: 600px) 480px, 800px"
                                data-caption={image.description}
                                >
                                <img className='gallery-multi-secondary-photo' src={image.secondPhoto} width="200" height="300" />
                            </a> : <></>}
                            {image.thirdPhoto !== '' ? 
                            <a
                                data-fancybox="responsive"
                                data-src={image.thirdPhoto}
                                data-sizes="(max-width: 600px) 480px, 800px"
                                data-caption={image.description}
                                >
                                <img className='gallery-multi-secondary-photo' src={image.thirdPhoto} width="200" height="300" />
                            </a> : <></>}
                            {image.fourthPhoto !== '' ? 
                            <a
                                data-fancybox="responsive"
                                data-src={image.fourthPhoto}
                                data-sizes="(max-width: 600px) 480px, 800px"
                                data-caption={image.description}
                                >
                                <img className='gallery-multi-secondary-photo' src={image.fourthPhoto} width="200" height="300" />
                            </a> : <></>}
                        </div>
                        
                      </Fancybox>
                      <div className='image-description-container'>
                        <h6 className='image-description'>{image.description}</h6>  
                      </div>
                  </div>
              )}
            </div>
        </>
    );

  }
  
export default Gallery;