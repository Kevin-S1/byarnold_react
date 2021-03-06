import '../css/about.css'

function About() {
    return (
      <>
      <section className="About">
        <img className='about-image about-image_left' src={require('../media/arnold2.jpg')}/>
        <article className="about-text">
            <h2 className='about-header'>Over ByArnold:</h2>
            <p className='about-paragraph'>
            Na een lange periode in de logistieke sector te hebben gewerkt heb ik het roer omgegooid en ben ik mijn passie, het maken van industriële verlichting, achterna gegaan. <br></br><br></br>
            Geïnspireerd  door mijn vader, kunstenaar in roestvrijstaal, heb ik mij het lassen en omgaan met ijzer eigen gemaakt.
            Mijn inspiratie haal ik uit industriële vormen. Doordat ik de verlichting zelf maak en bestaande voorwerpen vermaak ontstaat er een eigentijdse stijl waardoor elk item uniek is. <br></br><br></br>
            Mijn passie is het ontwerpen en maken van verlichting. Mijn lampen en meubels hebben een rustieke en industriele uitstraling en ik werk dan ook veel met staal, hout en hergebruikte materialen. Doordat ik de items zelf maak is het mogelijk om met een ontwerp te komen en dit in overleg bij mij te laten maken.
            <br></br><br></br>
            ByArnold staat voor eigentijds, rustiek en uniek!
            </p>
        </article>
        <img className='about-image about-image_right' src={require('../media/arnold2.jpg')}/>
      </section>
      </>
      
    );
  }
  
  export default About;