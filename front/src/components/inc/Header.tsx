import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigateTo = useNavigate()

    return (
        <header className="header">
            <Button 
                label="Se connecter"
                icon="pi pi-user"
                onClick={() => navigateTo('/auth/login')}
            />
            <Button 
                label="S'inscrire"
                icon="pi pi-user"
                onClick={() => navigateTo('/auth/register')}
            />
        </header>
    )
}

export default Header