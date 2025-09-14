import { Navbar as ReactstrapNavbar, Nav, NavLink, NavItem } from "reactstrap"
export default function Navbar() {
    return (
        <ReactstrapNavbar className="navbar">
            <Nav>
                <NavItem>
                    <NavLink href="/order"><img src="images/iteration-2-images/icons/1.svg" alt="Anasayfa" /> YENİ! Kore</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/order"><img src="images/iteration-2-images/icons/2.svg" alt="Sipariş" /> Pizza</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/order"><img src="images/iteration-2-images/icons/3.svg" alt="İletişim" /> Burger</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/order"><img src="images/iteration-2-images/icons/4.svg" alt="İletişim" /> Kızartmalar</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/order"><img src="images/iteration-2-images/icons/5.svg" alt="İletişim" /> Fast Food</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/order"><img src="images/iteration-2-images/icons/6.svg" alt="İletişim" /> Gazlı İçecek</NavLink>
                </NavItem>
            </Nav>
        </ReactstrapNavbar>
    )
}