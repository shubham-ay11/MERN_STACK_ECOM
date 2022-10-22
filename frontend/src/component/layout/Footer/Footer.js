import React from 'react';
import AppStore from "./Appstore.png";
import Google from "./playstore.png";
import "./footer.css";


const Footer = () => {
  return (
    <footer id="footer">
<div className='leftFooter'>
    <h4>Download Our App</h4>
    <img  src={AppStore} />
    <img src={Google}/>
</div>
<div className="midFooter">
        <h1>StudentCart.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2022 &copy; Shubham_Joshi</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="#">Instagram</a>
        <a href="#">Youtube</a>
        <a href="#">Facebook</a>
      </div>
    </footer>
  )
}

export default Footer
