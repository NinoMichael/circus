import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'

const InputNombreReservants = ({ nbreReservant, setNbreReservant, load, loading }) => (
  <>
    <h2 className="text-center text-lg font-kanit">Veuillez entrer le nombre de réservants</h2>

    <div className="p-inputgroup flex-1 w-96 mt-8 mx-auto items-center">
      <span className="p-inputgroup-addon">
        <i className="pi pi-users"></i>
      </span>
      <FloatLabel>
        <InputText value={nbreReservant} onChange={(e) => setNbreReservant(e.target.value)} className="h-9" />
        <label htmlFor="nbreReservant" className="font-poppins text-sm">Nombre de réservants</label>
      </FloatLabel>
    </div>

    <Button icon="pi pi-check" label="Valider" className="border border-none outline outline-none font-poppins text-sm px-8 flex justify-center items-center mx-auto mt-8"
      onClick={load} loading={loading} />
  </>
)

export default InputNombreReservants
