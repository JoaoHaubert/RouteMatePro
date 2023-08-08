//@ts-nocheck
import React from 'react';
import { useFormContext } from './FormContext';
import { FormControl, TextField, MenuItem } from '@mui/material';
//components
import FlexBetween from '@/components/FlexBetween';

const FormOne: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
  };


  return (
      <FlexBetween p="15px" flexDirection="column">
        <TextField
          required
          id="outlined-required"
          label="Nome do Veiculo"
          helperText="Dê um nome, código ou apelido para o veículo."
          value={formData.vehicleName}
          onChange={handleChange("vehicleName")}
        />
        <TextField
          label="Placa do Veículo"
          value={formData.vehicleTag}
          onChange={handleChange("vehicleTag")}
        />
        <TextField
          select
          label="Tipo do Veículo"
          id="outlined-select-car-type"
          onChange={handleChange("vehicleType")}
          value={formData.vehicleType}
        >
          {vehicleType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Status do Veículo"
          id="outlined-select-car-type"
          onChange={handleChange("vehicleStatus")}
          value={formData.vehicleStatus}
        >
          {vehicleStatus.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Propriedade"
          id="outlined-select-car-type"
          onChange={handleChange("vehicleOwnership")}
          value={formData.vehicleOwnership}
        >
          {vehicleOwnership.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Grupo do Veículo"
          helperText="Defina o grupo do veículo. Ex: Jardinagem, Laticínios, etc."
          value={formData.vehicleGroup}
          onChange={handleChange("vehicleGroup")}
        />
      </FlexBetween>
  );
};

export default Identification;