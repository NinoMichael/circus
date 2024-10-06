import { Button } from 'primereact/button'

const SelectionPlace = ({ seatRows, reservedSeats, selectedSeats, handleSeatClick, load2, loading2 }) => (
    <>
        <h2 className="text-center text-lg font-kanit">Veuillez choisir votre place dans le bus</h2>

        <section className="mx-8 mt-2">
            <div className="flex flex-row justify-center items-center mx-auto space-x-5">
                <div className="flex flex-row space-x-2 mt-4">
                    <button className="p-2 h-4 w-4 bg-white border rounded"></button>
                    <p className="font-poppins text-xs">Disponible</p>
                </div>

                <div className="flex flex-row space-x-2 mt-4 rounded">
                    <button className="p-2 h-4 w-4 bg-slate-500"></button>
                    <p className="font-poppins text-xs">Occupé</p>
                </div>

                <div className="flex flex-row space-x-2 mt-4 rounded">
                    <button className="p-2 h-4 w-4 bg-amber-400"></button>
                    <p className="font-poppins text-xs">Sélectionné</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-x-6 gap-y-2 mt-6 mb-3 mx-12">
                {seatRows.map((row) =>
                    row.map((seat) => (
                        <Button key={seat} label={seat}
                            className={`font-poppins text-sm outline-none p-2 ${reservedSeats.includes(seat) ? 'bg-slate-400 cursor-not-allowed'
                                : selectedSeats.includes(seat) ? 'bg-amber-400'
                                    : 'bg-white border border-slate-300'}`}
                            disabled={reservedSeats.includes(seat)} onClick={(e) => handleSeatClick(seat, e)} />
                    ))
                )}
            </div>
        </section>

        <div className="flex flex-row justify-center space-x-4 w-full -ms-1">
            <Button label="Annuler" className="border border-none outline outline-none font-poppins text-sm px-20 mt-8 bg-slate-300" />
            <Button icon="pi pi-check" label="Valider" className="border border-none outline outline-none font-poppins text-sm px-20 mt-8"
                onClick={load2} loading={loading2} />
        </div>
    </>
)

export default SelectionPlace;
