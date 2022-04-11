import {MdEmail, MdPhone} from 'react-icons/md';
import {BsFillTelephoneFill} from 'react-icons/bs'
import '../css/contact.css';


function Contact() {
    return (
      <>
      <div className="Contact">
        <article className='contact-sheet'>
            <h4 className='contact-header'>Contact</h4>
            <p className='contact-text'>Bent u geinteresseerd in een eigen op maat gemaakte lamp of meubel, neemt u dan gerust contact op via email of telefoon!</p>
            <a className='email-link' href = "mailto: arnold@byarnold.com">
              <h6 className='contact-text-bold'><MdEmail /> arnold@byarnold.com</h6>
            </a>
            <h6 className='contact-text-bold'><BsFillTelephoneFill /> 0627496887</h6>
        </article>
      </div>
      
      
      </>
    );
  }
  
  export default Contact;