import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import loading from './assets/loading200.gif';
import intro1 from './assets/intro1.jpg';
import foto1 from './assets/foto1.png';
import foto2 from './assets/foto2.jpg';
import foto3 from './assets/foto3.png';
import foto4 from './assets/foto4.png';
import car1 from './assets/car1.jpg';
import car2 from './assets/car2.png';
import car3 from './assets/car3.png';
import hoja1 from './assets/hoja1.png';
import hoja2 from './assets/hoja2.png';
import hoja3 from './assets/hoja3.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './App.css';
import songmp3 from './assets/MRDS.mp3';


const getCountdown = () => {
  const hour = 3600;
  const day = hour *  24;
  const month = day * 30;
  const wedd = 1678570200;
  const now = Math.floor(Date.now() / 1000);
  let totalLeft = wedd - now;
  const monthLeft = Math.floor(totalLeft / month);
  totalLeft = totalLeft - (monthLeft * month);
  const dayLeft = Math.floor(totalLeft / day);
  totalLeft = totalLeft - (dayLeft * day);
  const hourLeft = Math.floor(totalLeft / hour);
  return [monthLeft, dayLeft, hourLeft];
};

function App() {
  const [initialLoad, setInitialLoad] = useState(false);
  const [enter, setEnter] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [timeLeft, setTimeLeft] = useState([0, 0, 0]);
  const [playing, setPlaying] = useState(false);
  const [inviteData, setInviteData] = useState('');
  const [confirmacionOk, setConfirmacionOk] = useState(false);
  let content;

  useEffect(() => {
    //get countdown
    setTimeLeft(getCountdown());
    //preload images
    const imageList = [intro1, foto1, foto2, foto3, foto4, car1, car2, car3, hoja1, hoja2, hoja3];
    imageList.forEach((image) => {
      new Image().src = image;
    });

    setTimeout(() => {
      setInitialLoad(true);
    }, 2000);
  }, []); // eslint-disable-line

  const playAudio = () => {
    const song = document.getElementById('song'); 
    song.play(); 
    setPlaying(true);
  };

  const pauseAudio = () => {
    const song = document.getElementById('song'); 
    song.pause(); 
    setPlaying(false);
  };

  const toggleAudio = () => {
    if(playing) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const editNames = (e) => {
    setInviteData(e.target.value);
  };

  const sendEmail = (body, callback) => {
    if(window.Email) {
      window.Email.send({
        Host: "smtp.elasticemail.com",
        Username: "wedd.dani.jorge@gmail.com",
        Password: "B6E151D762ABEC66E74C2A6E2F1A7D324AAD",
        To: 'danirojas13.07@gmail.com',
        From: "wedd.dani.jorge@gmail.com",
        Subject: "[Confirmacion Asistencia] Boda Amanda y Marco",
        Body: body,
      })
        .then(function (message) {
          callback();
          console.log('||--message', message);
        });
    } 
  };

  const submitInvites = () => {
    if(inviteData !== '') {
      let body = 'Confirmación asistencia a la boda:<br /><br />';
      body += inviteData;
      body += '<br />--------------------';
      sendEmail(body, () => {
        setConfirmacionOk(true);
      });
    } 
  };

  const enterInvite = () => {
    setEnter(true);
    playAudio();
    setTimeout(() => {
      setFadeIn(true);
    }, 200);
  };

  if(!initialLoad) {
    content = (
      <div className="App-loading">
        <img src={loading} alt="Loading..." style={{width: '30%', display: 'block', margin: '90px auto 0 auto'}} />
      </div>
    );
  }

  if(initialLoad && !enter) {
    content = (
      <div className="App-loading" style={{position: 'relative'}}>
        <img src={intro1} alt=" " style={{width: '100%', display: 'block'}} />
        <button className="enter-button" onClick={enterInvite} style={{display: 'block', position: 'absolute', top: '31%', left: '50%'}}>Entrar</button>
      </div>
    );
  }

  if(initialLoad && enter) {
    content = (
      <div className={`App ${fadeIn ? 'fadeIn' : ''}`}>
        <img src={foto1} alt="Amanda & Marco" style={{width: '100%', display: 'block'}} />
        <div style={{width: '100%', height: 20, display: 'block', backgroundColor: '#D7C4B8'}}></div>
        <img src={foto2} alt="Amanda & Marco" style={{width: '100%', display: 'block'}} />
        <div style={{width: '100%', height: 20, display: 'block', backgroundColor: '#D7C4B8'}}></div>
        <img src={foto3} alt="Amanda & Marco" style={{width: '100%', display: 'block'}} />
        {/* countdown */}
        <div style={{position: 'relative', color: '#A29C98'}}>
          <img src={hoja1} alt=" " style={{width: '50%', display: 'block', position: 'absolute', left: '0%', top: '0%'}} />
          <img src={hoja2} alt=" " style={{width: '25%', display: 'block', position: 'absolute', right: '0%', bottom: '0%'}} />
          <div className="dat-time" style={{display: 'flex', justifyContent: 'center', color: '#A29C98', fontFamily: 'Playfair', paddingTop: 60}}>
            <div>
              <div style={{fontSize: '25px', lineHeight: '23px', borderTop: '1px solid #A29C98', borderBottom: '1px solid #A29C98', padding: '4px 12px'}}>Sábado</div>
            </div>
            <div className="days">
              <div style={{fontSize: '62px', lineHeight: '14px', padding: '0 10px'}}>11</div>
            </div>
            <div>
              <div style={{fontSize: '25px', lineHeight: '23px', borderTop: '1px solid #A29C98', borderBottom: '1px solid #A29C98', padding: '4px 12px'}}>Marzo</div>
            </div>
          </div>
          {/* ceremonia */}
          <h2 style={{fontFamily: 'Playfair', color: '#706F6F', fontSize: 16, fontWeight: 400, paddingTop: 40}}>Ceremonia Religiosa</h2>
          <p style={{fontFamily: 'NexaLight', fontSize: '14px', lineHeight: '16px', fontWeight:600, padding: '4px 0'}}>3:30pm</p>
          <p style={{fontFamily: 'MontserratExtraLight', fontSize: 12, lineHeight: '16px'}}>Templo de la diaconía de<br />Sábana Larga, Atenas</p>
          {/* recepción */}
          <h2 style={{fontFamily: 'Playfair', color: '#706F6F', fontSize: 16, fontWeight: 400, paddingTop: 40}}>Recepción</h2>
          <p style={{fontFamily: 'NexaLight', fontSize: '14px', lineHeight: '16px', fontWeight:600, padding: '4px 0'}}>5:00pm</p>
          <p style={{fontFamily: 'MontserratExtraLight', fontSize: 12, lineHeight: '16px'}}>Hacienda VargasÚ,<br />Río Grande de Atenas</p>
          {/* countdown */}
          <div className="counter" style={{display: 'flex', justifyContent: 'center', color: '#A29C98', padding: '70px 0'}}>
            <div className="months">
              <div style={{fontFamily: 'Playfair', paddingBottom: '4px', fontSize: '36px'}}>{("0" + timeLeft[0]).slice(-2)}</div>
              <div style={{fontFamily: 'MontserratExtraLight', fontSize: 12, letterSpacing: '2px'}}>MESES</div>
            </div>
            <div className="days" style={{padding: '0 22px'}}>
              <div style={{fontFamily: 'Playfair', paddingBottom: '4px', fontSize: '36px'}}>{("0" + timeLeft[1]).slice(-2)}</div>
              <div style={{fontFamily: 'MontserratExtraLight', fontSize: 12, letterSpacing: '2px'}}>DÍAS</div>
            </div>
            <div className="hours">
              <div style={{fontFamily: 'Playfair', paddingBottom: '4px', fontSize: '36px'}}>{("0" + timeLeft[2]).slice(-2)}</div>
              <div style={{fontFamily: 'MontserratExtraLight', fontSize: 12, letterSpacing: '2px'}}>HORAS</div>
            </div>
          </div>
        </div>
        <div style={{width: '100%', height: 20, display: 'block', backgroundColor: '#D7C4B8'}}></div>
        <div> {/* carousel */}
          <Carousel
            autoPlay
            infiniteLoop
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            interval={3500}
          >
            <div>
                <img src={car1} alt=" " />
            </div>
            <div>
                <img src={car2} alt=" " />
            </div>
            <div>
                <img src={car3} alt=" " />
            </div>
          </Carousel>
        </div>
        {/* obsequios */}
        <div style={{position: 'relative'}}>
          <img src={hoja3} alt=" " style={{width: '25%', display: 'block', position: 'absolute', left: '0%', bottom: '0%'}} />
          <h2 style={{fontFamily: 'Playfair', color: '#A29C98', fontSize: 20, fontWeight: 400, paddingTop: 40, paddingBottom: 20}}>OBSEQUIOS</h2>
          <p style={{fontFamily: 'NexaLight', color: '#727272', fontSize: '14px', lineHeight: '22px', paddingBottom: 70}}>Nuestro mayor regalo será<br />su compañía en este día tan especial.<br />Pero si desean hacernos un obsequio,<br />aceptamos las muestras de cariño en efectivo.<br />Pueden colocar su presente en un sobre<br />y depositarlo en el buzón el día de la boda.</p>
        </div>
        {/* asistencia */}
        <div style={{position: 'relative'}}>
          <img src={foto4} alt=" " style={{width: '100%', display: 'block', position: 'absolute', left: '0%', top: '0%'}} />
          <div style={{position: 'relative'}}>
            <h2 style={{fontFamily: 'Playfair', color: '#FFFFFF', fontSize: 20, fontWeight: 400, paddingTop: 30}}>CONFIRMAR ASISTENCIA</h2>
            <p style={{fontFamily: 'MontserratExtraLight', color: '#FFFFFF', fontSize: 12, lineHeight: '18px', paddingTop: 20}}>Para el descanso de los niños y el disfrute<br />de los padres, este evento será solo para adultos.</p>
            <input type="text" className="input-confirm" name="invite-names" placeholder="Nombre(s) completo(s)" onChange={(e) => { editNames(e)}} style={{fontFamily: 'MontserratExtraLight', minWidth: '60%', marginTop: 30}}/>
            <p style={{fontFamily: 'MontserratExtraLight', color: '#FFFFFF', fontSize: 12, lineHeight: '14px', paddingTop: 10}}>Confirmar asistencia antes del <strong>11 de febrero</strong></p>
            <p style={{fontFamily: 'MontserratExtraLight', color: '#FFFFFF', fontSize: 12, lineHeight: '14px', paddingTop: 6}}><strong>WhatsApp:</strong> Amanda 71049096 Marco 88065174</p>
            {!confirmacionOk && 
            <button className="confirm-button" onClick={submitInvites} style={{marginTop: 16}}>Confirmar</button>
            }
            {confirmacionOk && 
              <p style={{fontFamily: 'MontserratExtraLight', color: '#FFFFFF', fontSize: 12, marginTop: 16}}><strong>Confirmación enviada. Gracias!</strong></p>
            }
            <p style={{fontFamily: 'MontserratExtraLight', color: '#FFFFFF', fontSize: 12, lineHeight: '14px', paddingTop: 20}}><strong>Código de vestimenta formal</strong></p>
            <p style={{fontFamily: 'NexaLight', color: '#FFFFFF', fontSize: 8, lineHeight: '14px', paddingTop: 6}}>INVITACIÓN PERSONAL E INSTRANSFERIBLE</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <audio autoPlay id="song">
        <source src={songmp3} type="audio/mpeg" />
      </audio>
      {content}
    </div>
  );
}

export default App;
