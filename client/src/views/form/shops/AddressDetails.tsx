import React from "react";
import { TextField } from "@mui/material";
import axios from "axios";
//components
import FlexBetween from "@/components/FlexBetween";
import { useFormShopContext } from "@/components/FormContextShops";
import { FormDataShop } from "@/types";

const AddressDetail: React.FC = () => {
  const { formData, setFormData } = useFormShopContext();

  const handleChange =
    (field: keyof FormDataShop) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
    };

  const consultCep = async () => {
    const cep = formData.storePost; // Assuming postCode is the CEP field
    try {
      const response = await axios.get(`http://viacep.com.br/ws/${cep}/json`);

      if (response.status === 200) {
        const data = response.data;
        setFormData((prevData) => ({
          ...prevData,
          storeAddress: data.logradouro,
          storeCity: data.localidade,
          storeState: data.uf,
        }));
      } else {
        console.log("Não foi possível consultar CEP");
      }
    } catch (error: any) {
      console.error("Erro na consulta do CEP", error.message);
    }
  };

  return (
    <FlexBetween p="15px" flexDirection="column">
      <TextField
      required
        id="outlined-required"
        label="CEP"
        value={formData.storePost}
        onChange={handleChange("storePost")}
        onBlurCapture={consultCep}
        inputProps={{
          maxLength: 10,
        }}
      />
      <TextField
        id="outlined-required"
        label="Endereço"
        value={formData.storeAddress}
        onChange={handleChange("storeAddress")}
      />
       <TextField
        required
        id="outlined-required"
        label="Número"
        value={formData.storeNumber}
        onChange={handleChange("storeNumber")}
        onBlurCapture={consultCep}
        inputProps={{
          maxLength: 8,
        }}
      />
      <TextField
        id="outlined-required"
        label="Cidade"
        value={formData.storeCity}
        onChange={handleChange("storeCity")}
      />
      <TextField
        id="outlined-required"
        label="Estado"
        value={formData.storeState}
        onChange={handleChange("storeState")}
      />
    </FlexBetween>
  );
};

export default AddressDetail;
