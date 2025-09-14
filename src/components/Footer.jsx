import li0 from "../../images/iteration-2-images/footer/insta/li-0.png";
import li1 from "../../images/iteration-2-images/footer/insta/li-1.png";
import li2 from "../../images/iteration-2-images/footer/insta/li-2.png";
import li3 from "../../images/iteration-2-images/footer/insta/li-3.png";
import li4 from "../../images/iteration-2-images/footer/insta/li-4.png";
import li5 from "../../images/iteration-2-images/footer/insta/li-5.png";

export default function Footer() {
    const instaImages = [li0, li1, li2, li3, li4, li5];
    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-top">
                        {/* Logo ve adres */}
                        <div className="footer-col">
                            <img src="../../images/iteration-2-images/footer/logo-footer.svg" alt="Logo" className="footer-logo" />
                            <div className="footer-address">
                                <div className="address-item">
                                    <img src="images\iteration-2-images\footer\icons\icon-1.png" alt="Adres" />
                                    <span>123 Pizza Sokak,<br/> Istanbul Türkiye</span>
                                </div>
                                <div className="address-item">
                                    <img src="images\iteration-2-images\footer\icons\icon-2.png" alt="Telefon" />
                                    <span>+90 555 123 4567</span>
                                </div>
                                <div className="address-item">
                                    <img src="images\iteration-2-images\footer\icons\icon-3.png" alt="E-posta" />
                                    <span>pizza@teknolojikyemekler.com</span>
                                </div>
                                </div>
                        </div>

                        {/* Menü başlığı ve menü isimleri */}
                        <div className="footer-col">
                            <h4>Hot Menu</h4>
                            <ul>
                                <li>Terminal Pizza</li>
                                <li>5 kişilik Hackathlon Pizza</li>
                                <li>useEffect Tavuklu Pizza</li>
                                <li>Beyaz Console Frosty</li>
                                <li>Testler Geçti Mutlu Burger</li>
                                <li>Position Absolute Acı Burger</li>
                            </ul>
                        </div>

                        {/* Instagram başlığı ve 3x2 resimler */}
                        <div className="footer-col">
                            <h4>Instagram</h4>
                            <div className="instagram-flex">
                                {instaImages.map((img, i) => (
                                    <img key={i} src={img} alt={`Instagram ${i}`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <hr />

                    {/* Copyright */}
                    <div className="footer-bottom">
                        <p>© 2023 Teknolojik Yemekler.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}