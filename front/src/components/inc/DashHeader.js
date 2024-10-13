import React from "react"
import { useLanguage } from "../../context/LanguageContext"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Badge } from "primereact/badge"
import { Avatar } from "primereact/avatar"
import { Link } from "react-router-dom"

const DashHeader = () => {
    const { t } = useLanguage()

    return (
        <header className="flex justify-between bg-white fixed shadow-sm w-[82vw] h-[10vh] -mt-3 pt-2 pb-12 ps-6 pe-10 z-50">
            <div className="flex justify-start mt-4">
                <i className="pi pi-bars mt-2 me-8"></i>
                <h1 className="text-2xl font-kanit w-[11rem]">{t('dashboard')}</h1>
            </div>

            <form className="p-inputgroup ms-64 mt-4">
                <InputText placeholder={t('searchText')} className="font-poppins text-xs h-8 w-48" />
                <Button icon="pi pi-search" className="p-button-warning h-8" />
            </form>

            <div className="flex ms-40">
                <i className="pi pi-bell p-overlay-badge mt-6">
                    <Badge value="2" className="font-poppins"></Badge>
                </i>

                <Link className="flex space-x-3 ms-8 mt-1" to="/info-coop">
                    <Avatar label="M" size="large" shape="circle" className="bg-slate-900 text-white" />
                    <div className="mt-1">
                        <h4 className="text-xs">Mirindra</h4>
                        <p className="text-sm font-kanit">Sonatra</p>
                    </div>
                </Link>
            </div>

        </header>
    )
}

export default DashHeader