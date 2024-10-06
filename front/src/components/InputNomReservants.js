import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { Checkbox } from 'primereact/checkbox'

const NomReservants = ({ nomReservant, handleChangeNom, checked, setChecked, load1, loading1 }) => (
    <>
        <h2 className="text-center text-lg font-kanit">Veuillez entrer le nom des réservants</h2>

        <div className="overflow-x-hidden mb-8">
            {nomReservant.map((nom, index) => (
                <div key={index} className="p-inputgroup flex-1 w-96 mt-6 mx-auto items-center">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <FloatLabel>
                        <InputText value={nom} onChange={(e) => handleChangeNom(index, e.target.value)} className="h-9 text-sm"
                        />
                        <label htmlFor={`reservant-${index}`} className="font-poppins text-xs">
                            Nom du réservant {index + 1}
                        </label>
                    </FloatLabel>
                </div>
            ))}
        </div>

        <div className="ms-32">
            <Checkbox inputId="includeuser" onChange={(e) => setChecked(e.checked)} checked={checked} />
            <label htmlFor="includeuser" className="ml-2 font-poppins text-xs cursor-pointer">
                Vous inclure dans la liste
            </label>
        </div>
        <div className="flex flex-row justify-center space-x-4 w-full -ms-1">
            <Button label="Annuler" className="border border-none outline outline-none font-poppins text-sm px-20 mt-8 bg-slate-300" />
            <Button icon="pi pi-check" label="Valider" className="border border-none outline outline-none font-poppins text-sm px-20 mt-8"
                onClick={load1} loading={loading1} />
        </div>
    </>
)

export default NomReservants
