import React, { useState, useRef, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { addEmployee } from "./EmployeeManager"
import { getLocations } from "../location/LocationManager"
// import { getAnimals } from "../animal/AnimalManager"
import "./Employees.css"

export const EmployeeForm = () => {
    const name = useRef(null)
    const location = useRef(null)
    const address = useRef(null)

    const history = useHistory()

    const [locations, setLocations] = useState([])

    /*
        Get animal state and location state on initialization.
    */
    useEffect(() => {
       getLocations().then(locationsData => setLocations(locationsData))
    }, [])

    const constructNewEmployee = () => {
        /*
            The `location` and `animal` variables below are
            the references attached to the input fields. You
            can't just ask for the `.value` property directly,
            but rather `.current.value` now in React.
        */
        const locationId = parseInt(location.current.value)

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            addEmployee({
                name: name.current.value,
                address: address.current.value,
                locationId
            })
            .then(() => history.push("/employees"))
        }
    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employeeName">Employee name: </label>
                    <input type="text" id="employeeName" ref={name} required autoFocus className="form-control" placeholder="Employee name" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employeeName">Employee address: </label>
                    <input type="text" id="employeeName" ref={address} required autoFocus className="form-control" placeholder="Employee address" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select defaultValue="" name="location" ref={location} id="employeeLocation" className="form-control" >
                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Caretaker for: </label>
                    <select defaultValue="" name="animal" ref={animal} id="employeeAnimal" className="form-control" >
                        <option value="0">Select an animal</option>
                        {animals.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset> */}
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewEmployee()
                }}
                className="btn btn-primary">
                Save Employee
            </button>
        </form>
    )
}
