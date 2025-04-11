import React from 'react'
import { FaUser } from "react-icons/fa6";

const VehicleModal = ({ vehiclePanel, setSelectedVehicle, setconfirmVmodal,Vehicles,loading }) => {

    
    const handleConfirmVehicleModal = (vehicle) => {
        setSelectedVehicle({ img: vehicle.img, far: vehicle.far, provide: vehicle.provide, name: vehicle.vehicleName ,fare:vehicle.fare,vehicleType:vehicle.vehicleType})
        setconfirmVmodal(true)

    }
    return (
        
        <div ref={vehiclePanel} className='  fixed z-10 bottom-0 bg-white p-3 w-full translate-y-full'>


            <h3 className='text-2xl font-semibold'>Choose a Vehicle</h3>
            {Vehicles.map((vehicle, index) => <div key={index} onClick={() => { handleConfirmVehicleModal(vehicle) }} className='flex items-center justify-between    my-4   rounded-xl p-2 h-25'>
                <img className='h-10 p-1  ' src={vehicle.img} alt="" />
                <div className='  w-1/2'>
                    <h4 className='flex gap-1 items-center font-semibold'>{vehicle.vehicleName}<span className='flex ml-1 items-center  '>< FaUser /> 4</span></h4>
                    <h5 className='font-medium text-sm'>{vehicle.far}</h5>
                    <p className='text-sm font-medium text-[#808080]'>{vehicle.provide}</p>
                </div>
                <h2 className='font-semibold pr-2'>₹{vehicle.fare}</h2>
            </div>)}
        </div>
    )
}

export default VehicleModal;
