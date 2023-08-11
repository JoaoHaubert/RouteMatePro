//@ts-nocheck
import React from "react";
import { useFormContext } from "./FormContextVehicle";
import { TextField, MenuItem } from "@mui/material";
//components
import FlexBetween from "@/components/FlexBetween";

const Identification: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
    };
  const vehicleType = [
    { value: "car", label: "Carro" },
    { value: "truck", label: "Caminhão" },
    { value: "forklift", label: "Empilhadeira" },
    { value: "van", label: "Furgão" },
    { value: "motorcycle", label: "Moto" },
    { value: "bus", label: "Ônibus" },
    { value: "pickup", label: "Picape" },
    { value: "others", label: "Outros" },
  ];

  const vehicleStatus = [
    { value: "active", label: "Ativo" },
    { value: "assigned", label: "Em Serviço" },
    { value: "inactive", label: "Inativo" },
    { value: "out of service", label: "Fora de serviço" },
    { value: "sold", label: "Vendido" },
  ];
  const vehicleOwnership = [
    { value: "owner", label: "Próprio" },
    { value: "rented", label: "Alugado" },
    { value: "client", label: "Cliente" },
    { value: "leased", label: "Arrendado" },
  ];

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
        label="Fabricante do Veículo"
        value={formData.vehicleBrand}
        onChange={handleChange("vehicleBrand")}
        helperText="Exemplo: Ford ou Volkswagen."
      />
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
