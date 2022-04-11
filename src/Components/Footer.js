import '../css/footer.css'
import { FaFacebook, FaInstagram, FaPinterest, FaEtsy } from 'react-icons/fa';
import Voorwaarden from '../media/Algemene-Voorwaarden-ByArnold.pdf';

function Footer() {
    return (
      <>
        <div className="footer">
            <div className="footer-social">
            <a href='https://www.instagram.com/byarnold.design/'>
                <FaInstagram className='footer-social-icon' />
            </a>
            <a href='https://www.facebook.com/ArnoldByArnold/'>
                <FaFacebook className='footer-social-icon'/>
            </a>
            {/* <a href=''>
                <FaPinterest className='footer-social-icon'/>
            </a>
            <a href=''>
                <FaEtsy className='footer-social-icon'/>
            </a> */}
            </div>
            <h4 className="footer-text footer-text_bold">BYARNOLD</h4>
            <div className="footer-text-container">
                <h4 className="footer-text">arnold@byarnold.com</h4>
                <h4 className="footer-text">Kievitstraat 41, 2802EE, Gouda </h4>
                <h4 className="footer-text">KvK: 85695475</h4>
                <h4 className="footer-text">BTW nummer: NL004133357B39</h4>
                <a href={Voorwaarden}><h4 className="footer-text">Algemene Voorwaarden</h4></a>
            </div>
        </div>
      
      </>
    );
  }
  
  export default Footer;