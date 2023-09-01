import React, { useState, useEffect } from "react";
import axios from "axios";

interface Vehicle {
    _id: string,
    vehicleName: string,
}
const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios.get<Vehicle[]>("/create-vehicle").then((response) => {
      setVehicles(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Vehicle List</h2>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle._id}>{vehicle.vehicleName}</li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;
