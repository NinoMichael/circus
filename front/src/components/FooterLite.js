import React from "react";
import { Link } from 'react-router-dom';

export default function FooterLite({ className = "" }) {
    return (
        <footer className={className}>
            <nav className="text-xs flex justify-center items-center space-x-8">
                <Link to = "/privacy">Politiques de confidentialité</Link>
                <p>Copyright 2024 - Tous droits réservés</p>
                <Link to = "/terms">Conditions d'utilisation</Link>
            </nav>
        </footer>
    )
}