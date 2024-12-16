import '../assets/footer.css';

const Footer =()=>{
    return(
        <>
        {/* <div className="profile-footer">
              <p>
                <a href="#">Privacy Policy</a> | <a href="#">FAQ & Bantuan</a> |{" "}
                <a href="#">Help Center</a>
              </p>
            </div> */}
        <footer className="footer">
          <div className="footer-left">
            <p>© 2024 Tabungin Inc.</p>
            <a href="#">Terms & conditions</a>
            <a href="#">Privacy policy</a>
            <a href="#">Contact us</a>
          </div>
          <div className="footer-right">
            <a href="#">
              <img src="assets/img/f1.jpg" alt="Instagram" />
            </a>
            <a href="#">
              <img src="assets/img/f2.jpg" alt="Facebook" />
            </a>
            <a href="#">
              <img src="assets/img/f3.jpg" alt="YouTube" />
            </a>
            <a href="#">
              <img src="assets/img/f4.jpg" alt="LinkedIn" />
            </a>
            <a href="#">
              <img src="assets/img/f5.jfif" alt="Twitter" />
            </a>
          </div>
        </footer>
        </>
    )

}
export default Footer;