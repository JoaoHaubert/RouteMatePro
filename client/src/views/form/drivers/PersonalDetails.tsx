//@ts-nocheck
import React, { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
//components
import FlexBetween from "@/components/FlexBetween";
//forms
import { useFormDriverContext } from "@/components/FormContextDriver"
import { FormDataDriver } from "@/types";



const PersonalDetails: React.FC = () => {
  const { formData, setFormData } = useFormDriverContext();

  const handleChange =
    (field: keyof FormDataDriver) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
    };

    const consultCep = async () => {
      const cep = formData.postCode; // Assuming postCode is the CEP field
      try {
        const response = await axios.get(`http://viacep.com.br/ws/${cep}/json`);
  
        if (response.status === 200) {
          const data = response.data;
          setFormData((prevData) => ({
            ...prevData,
            address: data.logradouro,
            city: data.localidade,
            state: data.uf,
          }));
        } else {
          console.log("Não foi possível consultar CEP");
        }
      } catch (error) {
        console.error("Erro na consulta do CEP", error.message);
      }
    };


  function formatCPF(cpf: any) {
    if (!cpf) return "";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
 
  return (
          <FlexBetween p="15px" flexDirection="column">
            <TextField
              required
              id="outlined-required"
              label="CPF"
              value={formData.id}
              onChange={(event) => {
                const inputCPF = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 11);
                event.target.value = formatCPF(inputCPF);
                handleChange("id")(event);
              }}
              inputProps={{
                maxLength: 14,
              }}
            />
            <TextField
              required
              id="outlined-start-adorment"
              helperText="Data de nascimento"
              type="date"
              value={formData.birthDate}
              onChange={handleChange("birthDate")}
            />
            <TextField
              required
              id="outlined-required"
              label="CEP"
              value={formData.postCode}
              onChange={handleChange("postCode")}
              onBlurCapture={consultCep}
              inputProps={{
                maxLength: 8,
              }}
            />
            <TextField
              id="outlined"
              label="Endereço"
              value={formData.address}
              onChange={handleChange("address")}
            />
            <TextField
              type="number"
              id="outlined-required"
              label="Número"
              value={formData.number}
              onChange={handleChange("number")}
            />
            <TextField
              id="outlined"
              label="Cidade"
              value={formData.city}
              onChange={handleChange("city")}
            />
            <TextField
              id="outlined"
              label="Estado"
              value={formData.state}
              onChange={handleChange("state")}
            />
            <TextField
              id="outlined-required"
              label="Complemento"
              value={formData.complement}
              onChange={handleChange("complement")}
            />
          </FlexBetween>

  );
};

export default PersonalDetails;
