import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-section-container">
    <div className="footer-icons-container">
      <FaGoogle size={20} color="#3D3C3C" />
      <FaTwitter size={20} color="#3D3C3C" />
      <FaInstagram size={20} color="#3D3C3C" />
      <FaYoutube size={20} color="#3D3C3C" />
    </div>
    <p className="footer-section-text">Contact us</p>
  </div>
)
export default Footer
