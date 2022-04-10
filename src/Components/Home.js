import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';
import { FaFacebook, FaInstagram, FaPinterest, FaEtsy } from 'react-icons/fa';

function Home() {
  return (
    <>
        <div className="Home">
            <div className='row'>
                <div className='col'>
                    <h1 className='home-header'>BYARNOLD</h1>
                    <h4 className='home-subheader'>Een artistieke aanvulling op uw interieur.</h4>
                    <div className='home-item-container'>
                        <Link to='/about'>
                            <img className='home_image' src={require('../media/arnold.jpeg')}/>
                            <div className='home_image_text'>Over Mij</div>
                        </Link>
                    </div>
                </div>
                <div className='col'>
                <div className='home-item-container home-item-container_wide'>
                    <Link to='/gallery'>
                        <img className='home_image home_image_wide' src={require('../media/galleryCoverImage.jpg')}/>
                        <div className='home_image_text'>Gallerij</div>
                    </Link>
                </div>
                <div className='home-social-container'>
                    <a href='#'>
                        <FaInstagram className='home-social-icon' />
                    </a>
                    <a href=''>
                        <FaFacebook className='home-social-icon'/>
                    </a>
                    <a href=''>
                        <FaPinterest className='home-social-icon'/>
                    </a>
                    <a href=''>
                        <FaEtsy className='home-social-icon'/>
                    </a>
                
                </div>
                <div className='home-item-container '>
                    <Link to='/contact'>
                        <img className='home_image home_image_wide' src={require('../media/IMG_2255.JPEG')}/> 
                        <div className='home_image_text'>Contact</div>
                    </Link>
                </div>
                </div>

            </div>

            
            
        </div>
    
    
    </>
  );
}

export default Home;