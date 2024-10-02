import React, { useState } from "react"
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { useLanguage } from "../context/LanguageContext"
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'
import { Button } from "primereact/button"

const SearchBar2 = ({ className }) => {
    const { t, currentLanguage } = useLanguage()

    addLocale('EN', {
        firstDayOfWeek: 0,
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear'
    })

    addLocale('FR', {
        firstDayOfWeek: 1,
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        today: 'Aujourd\'hui',
        clear: 'Effacer'
    })

    const [selectedCitiesD, setSelectedCityD] = useState(null)
    const [selectedCitiesA, setSelectedCityA] = useState(null)
    const cities = [
        { name: 'Antananarivo' },
        { name: 'Toamasina' },
        { name: 'Mahajanga' },
        { name: 'Antsiranana' },
        { name: 'Toliara' },
        { name: 'Fianarantsoa' },
        { name: 'Antsirabe' },
        { name: 'Morondava' },
        { name: 'Mananjary' },
        { name: 'Tolagnaro' }
    ]

    const selectedCityTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            )
        }

        return <span>{props.placeholder}</span>
    }

    const [selectedCooperatives, setSelectedCooperative] = useState(null)
    const cooperatives = [
        { name: 'Kofmad' },
        { name: 'Kofimanga' },
        { name: 'Soatrans' },
        { name: 'Sonatra' },
        { name: 'Cotrag' },
        { name: 'Kofimandidy' },
        { name: 'CoSotrafa' },
        { name: 'Besady' },
        { name: 'Kofia' },
        { name: 'Cotisse' }
    ]

    const [date, setDate] = useState(null)

    const selectedCooperativeTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            )
        }

        return <span>{props.placeholder}</span>
    }


    return (
        <div className={className}>
            <form className="flex max-xsm:hidden">
                <div className="flex max-[1140px]:space-x-6 max-[860px]:space-x-0">
                    <FloatLabel className="relative focus-within:text-white">
                        <Dropdown value={selectedCitiesD} onChange={(e) => setSelectedCityD(e.value)} options={cities} optionLabel="name"
                            filter valueTemplate={selectedCityTemplate} panelClassName="font-poppins text-sm" className="w-36 max-[1140px]:w-44 max-[860px]:w-36 h-10 font-poppins text-sm bg-white border custom-p-dropdown-trip border-slate-400" />
                        <label htmlFor="dd-city" className="text-sm -mt-3"><i className="pi pi-map-marker  text-sm me-1"></i> {t('departure')}</label>
                    </FloatLabel>

                    <FloatLabel>
                        <Dropdown value={selectedCitiesD} onChange={(e) => setSelectedCityD(e.value)} options={cities} optionLabel="name"
                            filter valueTemplate={selectedCityTemplate} panelClassName="font-poppins text-sm" className="w-36 max-[1140px]:w-44 max-[860px]:w-36 h-10 font-poppins text-sm bg-white border border-slate-400" />
                        <label htmlFor="dd-city" className=" text-sm -mt-3"><i className="pi pi-map-marker  text-sm me-1"></i>{t('arrival')}</label>
                    </FloatLabel>

                    <FloatLabel>
                        <Calendar inputId="dd-date" value={date} onChange={(e) => setDate(e.value)} locale={currentLanguage}
                            className="font-poppins text-sm w-40 max-[1140px]:w-48 max-[860px]:w-40 h-10 bg-transparent border custom-home-calendar border-slate-400" />
                        <label htmlFor="dd-date" className=" text-sm -mt-3"><i className="pi pi-calendar  text-sm me-1"></i>Date</label>
                    </FloatLabel>

                    <FloatLabel>
                        <Dropdown value={selectedCooperatives} onChange={(e) => setSelectedCooperative(e.value)} options={cooperatives} optionLabel="name"

                            filter valueTemplate={selectedCooperativeTemplate} panelClassName="font-poppins text-sm" className="w-40 max-[1140px]:w-48 max-[860px]:w-40 h-10 font-poppins text-sm  custom-home-dropdown bg-transparent border border-slate-400" />

                        <label htmlFor="dd-cooperative" className=" text-sm -mt-3"><i className="pi pi-users  text-sm me-1"></i>{t('cooperative')}</label>
                    </FloatLabel>
                </div>

                <Button icon="pi pi-search" className="h-10" />
            </form>
        </div>
    )
}

export default SearchBar2