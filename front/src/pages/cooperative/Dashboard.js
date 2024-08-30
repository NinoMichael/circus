import React, {useState, useEffect} from "react"
import Dashmenu from "../../components/inc/Dashmenu"
import { motion } from "framer-motion"
import DashHeader from "../../components/inc/DashHeader"
import {Chart} from 'primereact/chart'
import {Calendar} from 'primereact/calendar'
import { useLanguage } from "../../context/LanguageContext"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import { addLocale } from "primereact/api"
import { Link } from "react-router-dom"
import { Dropdown } from "primereact/dropdown"

const DashboardCoop = () => {
    const {t, currentLanguage} = useLanguage()

    const [tripData, setTripData] = useState({})
    const [tripOptions, setTripOptions] = useState({})
    const [calendar, setCalendar] = useState(null);

    function getTripData () {
        const documentStyle = getComputedStyle(document.documentElement)
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [28, 30, 34, 10, 40, 12, 23],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.9,
                    pointRadius : 0.2,
                }
            ]
        }
    
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    display: false 
                }
            },
            scales: {
                x: {
                    display : false,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    display : false,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        }
    
        return { data, options }
    }

    useEffect(() => {
        const { data, options } = getTripData()
        setTripData(data)
        setTripOptions(options)
    }, [])

    const [travelerData, setTravelerData] = useState({})
    const [travelerOptions, setTravelerOptions] = useState({})

    function getTravelerData () {
        const documentStyle = getComputedStyle(document.documentElement)
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.9,
                    pointRadius : 0.2,
                }
            ]
        }
    
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    display: false 
                }
            },
            scales: {
                x: {
                    display : false,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    display : false,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        }
    
        return { data, options }
    }

    useEffect(() => {
        const { data, options } = getTravelerData()
        setTravelerData(data)
        setTravelerOptions(options)
    }, [])

    const [busData, setBusData] = useState({})
    const [busOptions, setBusOptions] = useState({})

    function getBusData () {
        const documentStyle = getComputedStyle(document.documentElement)
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 65, 66, 66, 66, 66, 66],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.9,
                    pointRadius : 0.2,
                }
            ]
        }
    
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    display: false 
                }
            },
            scales: {
                x: {
                    display : false,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    display : false,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        }
    
        return { data, options }
    }

    useEffect(() => {
        const { data, options } = getBusData()
        setBusData(data)
        setBusOptions(options)
    }, [])

    const [driverData, setDriverData] = useState({})
    const [driverOptions, setDriverOptions] = useState({})

    function getDriverData () {
        const documentStyle = getComputedStyle(document.documentElement)
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [128, 127, 128, 130, 130, 130, 129],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.9,
                    pointRadius : 0.2,
                }
            ]
        }
    
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    display: false 
                }
            },
            scales: {
                x: {
                    display : false,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    display : false,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        }
    
        return { data, options }
    }

    useEffect(() => {
        const { data, options } = getDriverData()
        setDriverData(data)
        setDriverOptions(options)
    }, [])

    const cardStats = [
        {
            value : '27',
            title : t('trips'),
            data : tripData,
            dataOptions : tripOptions,
        },
        {
            value : '128',
            title : t('travelers'),
            data : travelerData,
            dataOptions : travelerOptions,
        },
        {
            value : '100',
            title : 'bus',
            data : busData,
            dataOptions : busOptions,
        },
        {
            value : '159',
            title : t('drivers'),
            data : driverData,
            dataOptions : driverOptions,
        },
    ]

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

    const recentBooks = [
        {
            id : 1,
            fname : "John Wall",
            date : '07-07-2024',
            bus : 'TAF 2233',
            bookers : '1', 
            payment : 'Espèces'
        },
        {
            id : 2,
            fname : "Mary H.",
            date : '07-07-2024',
            bus : 'TAF 2233',
            bookers : '2', 
            payment : 'Mvola'
        },
        {
            id : 3,
            fname : "Harilala H.",
            date : '07-07-2024',
            bus : 'TSP 0321',
            bookers : '1', 
            payment : 'Airtel Money'
        },
        {
            id : 4,
            fname : "Todisoa J.",
            date : '07-07-2024',
            bus : 'TFU 5467',
            bookers : '3', 
            payment : 'Espèces'
        },
    ]

    const [busStatutsData, setBusStatusData] = useState({});
    const [busStatusOptions, setBusStatusOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Dispo', 'Vacant', 'Entretenu'],
            datasets: [
                {
                    data: [80, 13, 7],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setBusStatusData(data);
        setBusStatusOptions(options);
    }, []);

    const [travelerChartData, setTravelerChartData] = useState({});
    const [travelerChartOptions, setTravelerChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: [t('lun'), t('mar'), t('mer'), t('jeu'), t('ven'), t('sam'), t('dim')],
            datasets: [
                {
                    label: t('numberTravelers'),
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [265, 259, 280, 281, 256, 255, 240]
                },
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setTravelerChartData(data);
        setTravelerChartOptions(options);
    }, [t]);

    const [time, setTime] = useState(null);
    const periods = [
        {name : t('weekly'), period : "7 days"},
        {name :  t('monthly'), period : "31 days"},
        {name : t('annually'), period : "365 days"}, 
    ]

    return (
        <>
            <Dashmenu />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ps-[16.25rem] -z-50">
                <DashHeader />

                <main className="mt-3">
                    <div className="flex justify-between pt-20 ps-3">
                        <div className="flex justify-start space-x-2">
                            {cardStats.map ((cardStat, index) => (
                                <div key = {index} className="bg-white shadow-lg rounded-md grid grid-cols-2 p-3">
                                    <div className="">
                                    <p className = "text-2xl text-center font-bold">{cardStat.value}</p>
                                        <p className = "text-[0.75em] text-center">{cardStat.title}</p>
                                    </div>

                                    <div className="mt-3 cursor-pointer">
                                        <Chart type="line" data={cardStat.data} options={cardStat.dataOptions} className="w-24 h-10"/>
                                    </div>
                                </div>        
                            ))}
                        </div>

                        <div className="ms-2 me-3 mt-5">
                            <Button label={t('addTrip')} icon = "pi pi-plus" className="bg-amber-400 border border-none outline outline-none font-poppins text-sm"/>
                        </div> 
                    </div>

                    <section className="flex justify-between mt-6 ps-6 pe-4">
                        <section>
                            <article className="w-[50w]">
                                <h3 className="font-kanit text-xl">Répartition des bus</h3>
                                
                                <div className="flex justify-end me-3">
                                    <Dropdown value={time} onChange={(e) => setTime(e.value)} options={periods} optionLabel="name" panelClassName="bg-slate-900 text-sm text-white font-poppins custom-period-panel-dropdown"
                                        placeholder={t('weekly')} checkmark={true} highlightOnSelect={false} className="h-10 w-44 -mt-2 border border-none shadow-md custom-period-dropdown bg-slate-900" />
                                </div>

                                <div className="bg-white shadow-xl rounded p-3">
                                    <Chart type="bar" data={travelerChartData} options={travelerChartOptions} />
                                </div>
                            </article>

                            <article className="w-[50vw] mt-5">
                                <h3 className="font-kanit text-xl">{t('recentBooking')}</h3>
                                <div className="bg-white shadow-xl rounded p-3">
                                    <DataTable value={recentBooks} paginator rows={4}>
                                        <Column field="ID" header="ID" className="font-poppins text-sm" body={(rowData) => rowData.id} sortable></Column>
                                        <Column field={t('nameBook')} header={t('nameBook')} className="font-poppins text-sm" body={(rowData) => rowData.fname} sortable></Column>
                                        <Column field="Date" header="Date" className="font-poppins text-sm" body={(rowData) => rowData.date} sortable></Column>
                                        <Column field="Bus" header="Bus" className="font-poppins text-sm" body={(rowData) => rowData.bus} sortable></Column>
                                        <Column field={t('bookers')} header={t('bookers')} className="font-poppins text-sm text-center" body={(rowData) => rowData.bookers} sortable></Column>
                                        <Column field={t('payment')} header={t('payment')} className="font-poppins text-sm" body={(rowData) => rowData.payment} sortable></Column>
                                    </DataTable>

                                    <Link className="mt-3 mb-2 flex justify-end">
                                        <Button label={t('Détails')} className="text-sm bg-slate-900 text-white border border-none outline outline-none font-poppins py-1" />
                                    </Link>
                                </div>
                            </article>
                        
                        </section>

                        <aside className="">
                            <h4 className="font-kanit text-xl mt-2 mb-3">{t('calendar')}</h4>
                            <Calendar value={calendar} locale={currentLanguage} onChange={(e) => setCalendar(e.value)} inline  
                                className="w-[22rem] custom-dash-calendar overflow-hidden h-[22rem]"/>

                            <div className="mt-6">
                                <h4 className="font-kanit text-xl">Répartition des bus</h4>
                                <div className="bg-white shadow-md p-3 mt-2">
                                    <Chart type="doughnut" data={busStatutsData} options={busStatusOptions}  />
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="font-kanit text-xl">{t('travelStats')}</h4>
                                <div className="bg-white shadow-md p-3 mt-2">
                                    
                                </div>
                            </div>
                            
                        </aside>
    
                    </section>
                   
                </main>
            </motion.div>
        </>
        
    )
}

export default DashboardCoop