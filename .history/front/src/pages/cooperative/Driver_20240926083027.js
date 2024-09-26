import React from "react"
import { useLanguage } from '../../context/LanguageContext'

const DriverCoop = () => {
    const { t } = useLanguage()

    return (
        <>
            <Dashmenu />
        </>
    )
}

export default DriverCoop