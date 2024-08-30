import React from "react"
import { Link } from "react-router-dom"
import { useLanguage } from "../../context/LanguageContext"

const Footer = () => {
    const { t } = useLanguage()

    return (
        <footer className="flex justify-center space-x-36 text-[0.65em] mt-24 max-md:space-x-24 max-sm:space-x-8 max-[520px]:flex-col max-[520px]:text-center">
            <Link to="/">{t('terms2Services')}</Link>
            <Link to="/">{t('copyright')}</Link>
            <Link to="/conditions-of-use">{t('use2Conditions')}</Link>
        </footer>
    )
}

export default Footer