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
  const vehicleBrand = [
    { value: "Audi", label: "Audi" },
    { value: "BMW", label: "BMW" },
    { value: "BYD", label: "BYD" },
    { value: "Cherry", label: "Cherry" },
    { value: "Chevrolet", label: "Chevrolet" },
    { value: "DAF", label: "DAF" },
    { value: "Fiat", label: "Fiat" },
    { value: "Ford", label: "Ford" },
    { value: "GWM", label: "GWM" },
    { value: "Hino", label: "Hino" },
    { value: "Honda", label: "Honda" },
    { value: "Hyundai", label: "Hyundai" },
    { value: "International", label: "International" },
    { value: "Iveco", label: "Iveco" },
    { value: "Jeep", label: "Jeep" },
    { value: "Kia", label: "Kia" },
    { value: "MAN", label: "MAN" },
    { value: "Mercedes-Benz", label: "Mercedes-Benz" },
    { value: "Mitsubishi", label: "Mitsubishi" },
    { value: "Nissan", label: "Nissan" },
    { value: "Peugeot", label: "Peugeot" },
    { value: "Renault", label: "Renault" },
    { value: "Scania", label: "Scania" },
    { value: "Toyota", label: "Toyota" },
    { value: "Volkswagen", label: "Volkswagen" },
    { value: "Volvo", label: "Volvo" },
    { value: "Outras", label: "Outras" },
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
        select
        label="Fabricante do Veículo"
        value={formData.vehicleBrand}
        onChange={handleChange("vehicleBrand")}
      >
        {vehicleBrand.map((option) => (
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
