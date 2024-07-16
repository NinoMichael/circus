import React from "react";
import {Button} from "primereact/button";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown"
import {FloatLabel} from "primereact/floatlabel";
import { addLocale } from 'primereact/api';
import { useState } from "react"

export default function Search() {
    addLocale('fr', {
        firstDayOfWeek: 1,
        dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        dayNamesShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
        monthNamesShort: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
        today: 'Aujourd\'hui',
        clear: 'Effacer'
    });

    const [dates, setDates] = useState("")
    const [selectCooperative, setSelectCooperative] = useState("")
    const [selectRegionDepart, setSelectRegionDepart] = useState("")
    const [selectRegionArrivee, setSelectRegionArrivee] = useState("")


    const cooperatives = [
        {name : 'Sonatra'},
        {name : 'Kofimanga'},
        {name : 'Kofmad'},
        {name : 'Cotrag'},
        {name : 'Kofimandidy'},
        {name : 'Soatrans'},
        {name : 'Cotisse'},
    ]

    const regions = [
        {name : 'Antananarivo'},
        {name : 'Toamasina'},
        {name : 'Mahajanga'},
        {name : 'Fianarantsoa'},
        {name : 'Antsiranana'},
        {name : 'Toliara'},
        {name : 'Antsirabe'},
        {name : 'Ambositra'},
        {name : 'Ambatondrazaka'},
        {name : 'Tolagnaro'},
        {name : 'Antsohihy'},
        {name : 'Ambanja'},
        {name : 'Sambava'},
        {name : 'Tsiroanomandidy'},
        {name : 'Arivonimamo'},
        {name : 'Fandriana'},
        {name : 'Betafo'},
        {name : 'Vohipeno'},
        {name : 'Manakara'},
        {name : 'Mananjary'},
        {name : 'Ihosy'},
        {name : 'Ankazobe'},
        {name : 'Anjorozobe'},
        {name : 'Fénérive-Est'},
        {name : 'Farafangana'},
        {name : 'Miandrivazo'},
        {name : 'Morondava'},
    ]

    return (
        <>
        <form className="p-inputGroup flex justify-center items-center mt-6 bg-main px-4 pt-6 pb-4 shadow-lg mx-36 max-lg:mx-2 max-md:hidden">
            <div className="flex justify-start">
                <div>
                    <FloatLabel>
                        <Dropdown inputId="departRegion" value={selectRegionDepart} onChange = {(e) => setSelectRegionDepart(e.target.value)} options = {regions}  
                            optionLabel="name" filter panelClassName='text-sm' dropdownIcon = "pi pi-chevron-down text-sm"
                            className="h-10 w-48 max-[1160px]:w-36 custom-p-dropdown"/>
                        <label htmlFor = "departRegion" className="text-sm mb-4">Départ</label>
                    </FloatLabel>
                </div>
           
                <div>
                    <FloatLabel>
                        <Dropdown inputId="dd-arriveeRegion" value={selectRegionArrivee} onChange = {(e) => setSelectRegionArrivee(e.target.value)} options = {regions}  
                            optionLabel="name" filter panelClassName='text-sm' dropdownIcon = "pi pi-chevron-down text-sm"
                            className="h-10 w-48 max-[1160px]:w-36 custom-p-dropdown"/>
                        <label htmlFor = "dd-arriveeRegion" className="text-sm mb-4">Arrivée</label>
                    </FloatLabel>
                </div>
                
                <div>
                    <FloatLabel>
                        <Dropdown inputId="cooperative" value={selectCooperative} onChange = {(e) => setSelectCooperative(e.target.value)} options = {cooperatives}  
                            optionLabel="name" filter panelClassName='text-sm' dropdownIcon = "pi pi-chevron-down text-sm"
                            className="h-10 w-48 max-[1160px]:w-36 custom-p-dropdown"/>
                        <label htmlFor = "cooperative" className="text-sm mb-4">Coopérative</label>
                    </FloatLabel>
                </div>

                <div>
                    <FloatLabel>
                        <Calendar value = {dates} onChange={(e) => setDates(e.target.value)} dateFormat="dd/mm/yy" 
                            className="text-sm w-36 max-[1160px]:w-36" locale='fr' panelClassName="text-xs"/>
                        <label htmlFor = "dateVoyage" className="text-sm mb-4">Date de voyage</label>
                    </FloatLabel>
                </div>
            
            </div>
            
                <Button label = "Rechercher" icon = "pi pi-search" className="text-sm font-medium h-9"/>
            </form>

            <form className = "min-md:hidden mx-8 ">
                <section className="grid grid-cols-2 gap-2 bg-main p-3 rounded">
                    <div>
                        <FloatLabel>
                            <Dropdown inputId="departRegion" value={selectRegionDepart} onChange = {(e) => setSelectRegionDepart(e.target.value)} options = {regions}  
                                optionLabel="name" filter panelClassName='text-sm' dropdownIcon = "pi pi-chevron-down text-sm"
                                className="w-full"/>
                            <label htmlFor = "departRegion" className="text-sm mb-4">Départ</label>
                        </FloatLabel>
                    </div>

                    <div>
                        <FloatLabel>
                            <Dropdown inputId="dd-arriveeRegion" value={selectRegionArrivee} onChange = {(e) => setSelectRegionArrivee(e.target.value)} options = {regions}  
                                optionLabel="name" filter panelClassName='text-sm' dropdownIcon = "pi pi-chevron-down text-sm"
                                className="w-full"/>
                            <label htmlFor = "dd-arriveeRegion" className="text-sm mb-4">Arrivée</label>
                        </FloatLabel>
                    </div>

                    <div>
                        <FloatLabel>
             