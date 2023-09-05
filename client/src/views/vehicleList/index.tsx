import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormData } from "@/types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

interface Vehicle extends FormData {
  _id: string;
}


const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios
      .get<Vehicle[]>("http://localhost:5001/get-vehicle")
      .then((response) => {
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
