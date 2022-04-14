import {React, useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';
import { FaFacebook, FaInstagram, FaPinterest, FaEtsy } from 'react-icons/fa';
import logo from '../media/byarnold_logo.svg';
import galleryCoverFull from '../media/gallery_cover_full.jpg';
import galleryCoverMobile from '../media/gallery_cover_mobile.jpg';
import contactCoverFull from '../media/contact_cover_full.JPEG';
import contactCoverMobile from '../media/contact_cover_mobile.JPEG';

function Home() {

    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;
  return (
    <>
        <div className="Home">
            <div className='row'>
                <div className='col'>
                    <img className='home-logo_large' src={logo} alt='Site logo' />
                    <div className='home-item-container'>
                        <Link to='/about'>
                            <img className='home_image' src={require('../media/arnold.jpeg')} alt='Foto van Arnold'/>
                            <div className='home_image_text'>Over Mij</div>
                        </Link>
                    </div>
                </div>
                <div className='col'>
                <div className='home-item-container home-item-container_wide'>
                    <Link to='/gallery'>
                        <img className='home_image home_image_wide' src={isMobile ? galleryCoverMobile : galleryCoverFull} alt='Gallerij foto'/>
                        <div className='home_image_text'>Gallerij</div>
                    </Link>
                </div>
                <div className='home-social-container'>
                    <a href='https://www.instagram.com/byarnold.design/'>
                        <FaInstagram className='home-social-icon' />
                    </a>
                    <a href='https://www.facebook.com/ArnoldByArnold/'>
                        <FaFacebook className='home-social-icon'/>
                    </a>
                    <a href='https://www.pinterest.com/ByArnoldB/'>
                        <FaPinterest className='home-social-icon'/>
                    </a>
                    {/* <a href=''>
                        <FaEtsy className='home-social-icon'/>
                    </a> */}
                
                </div>
                <div className='home-item-container '>
                    <Link to='/contact'>
                        <img className='home_image home_image_wide' src={isMobile ? contactCoverMobile : contactCoverFull} alt='Contact foto'/> 
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