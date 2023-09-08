
import React from "react";
import { useFormContext } from "@/components/FormContextVehicles";
import { TextField, MenuItem } from "@mui/material";
//components
import FlexBetween from "@/components/FlexBetween";
import { FormData } from "@/types";

const Identification: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
    };
  const vehicleType = [
    { value: "Carro", label: "Carro" },
    { value: "Caminhão", label: "Caminhão" },
    { value: "Empilhadeira", label: "Empilhadeira" },
    { value: "Furgão", label: "Furgão" },
    { value: "Moto", label: "Moto" },
    { value: "Ônibus", label: "Ônibus" },
    { value: "Pickup", label: "Pickup" },
    { value: "Outros", label: "Outros" },
  ];

  const vehicleStatus = [
    { value: "Ativo", label: "Ativo" },
    { value: "Em Serviço", label: "Em Serviço" },
    { value: "Inativo", label: "Inativo" },
    { value: "Fora de Serviço", label: "Fora de serviço" },
    { value: "Vendido", label: "Vendido" },
  ];
  const vehicleOwnership = [
    { value: "Próprio", label: "Próprio" },
    { value: "Alugado", label: "Alugado" },
    { value: "Cliente", label: "Cliente" },
    { value: "Arrendado", label: "Arrendado" },
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
        required
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
