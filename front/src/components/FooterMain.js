import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";

export default function FooterMain() {
    return (
        <footer>
            <div>
                <p>lorem ipsum dolor si emet volontaris</p>
            </div> 

            <div>
                <h4>Catégorie</h4>
                <nav>
                    <Link to = "/cooperative">Coopératives</Link>
                    <Link to = "/news">Actualité</Link>
                </nav>
            </div>

            <div>
                <h4>Compagnie</h4>
                <nav>
                    <Link to = "/sitemap">Plan du site</Link>
                    <Link to = "/about">A propos</Link>
                    <Link to = "/privacy">Politiques de confidentialité</Link>
                    <Link to = "/terms">Conditions d'utilisation</Link>
                </nav>
            </div>

            <div>
                 <h4>Réseaux sociaux</h4>
                 <nav>
                    
                </nav>
            </div>

            <div>
                 <h4>Recevoir tous les actualités sur votre email</h4>
                 <form className="p-inputGroup">
                    <InputText label = "Votre adresse e-mail"/>
                    <Button label = "Soumettre"/>
                 </form>
            </div>
            
        </footer>
    )
}