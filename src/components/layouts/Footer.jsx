const Footer = ()=>{
    const footerYear = new Date().getFullYear()
    return (
        <footer className="footer p-10 bg-gray-700 text-white footer-center">
           <p>Copyright &copy; {footerYear} All rights reserved</p>
        </footer>
    )
}
export default Footer