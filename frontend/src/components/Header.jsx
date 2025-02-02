import logo from '../images/logo.svg'

export default function Header(){
    return(
        <header className="header">
            <div className="header__logo">
                <img src={logo} alt="Logo Around US" className="header__logo-image"/>
            </div>
        </header>
    )
}