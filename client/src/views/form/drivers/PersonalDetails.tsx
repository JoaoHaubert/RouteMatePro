//@ts-nocheck
import React, { useState } from "react";
import { Box, TextField, Grid } from "@mui/material";
import axios from "axios";
//components
import FlexBetween from "@/components/FlexBetween";
import SaveButton from "@/components/SaveButton";
//forms
import { useForm } from "react-hook-form";
type Props = {};

export default function PersonalDetails({}: Props) {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCep(event.target.value);
  };

  const consultCep = async () => {
    try {
      const response = await axios.get(`http://viacep.com.br/ws/${cep}/json`);

      if (response.status === 200) {
        const data = response.data;
        setLogradouro(data.logradouro);
        setCidade(data.localidade);
        setEstado(data.uf);
      } else {
        console.log("Não foi possível consultar CEP");
      }
    } catch (error) {
      console.error("Erro na consulta do CEP", error.message);
    }
  };

  const { register, handleSubmit } = useForm();

  async function onSubmit(data: any) {
    await consultCep();

    const formData = {
      ...data,
      address: logradouro,
      city: cidade,
      state: estado,
    };
    console.log(formData)
    
  }
  function formatCPF(cpf: any) {
    if (!cpf) return "";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  return (
    <Grid item>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box
          bgcolor="#fff"
          border="solid 1px #DDE6ED"
          borderRadius={4}
          m="2rem 2.5rem"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "90ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <FlexBetween p="15px" flexDirection="column">
            <TextField
              required
              id="outlined-required"
              label="CPF"
              {...register("cpf")}
              onChange={(event) => {
                const inputCPF = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 11);
                event.target.value = formatCPF(inputCPF);
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
              {...register("date")}
            />
            <TextField
              required
              {...register("postcode")}
              id="outlined-required"
              label="CEP"
              value={cep}
              onChange={(event) => {
                handleInputChange(event); // Call handleInputChange to update the cep state
                consultCep(); // Call consultCep to fetch and update address, city, and state
              }}
              onBlurCapture={consultCep}
              inputProps={{
                maxLength: 8,
              }}
            />
            <TextField
              id="outlined"
              label="Endereço"
              value={logradouro}
              {...register("address")}
            />
            <TextField
              type="number"
              id="outlined-required"
              label="Número"
              {...register("number")}
            />
            <TextField
              id="outlined"
              label="Cidade"
              value={cidade}
              {...register("city")}
            />
            <TextField
              id="outlined"
              label="Estado"
              value={estado}
              {...register("state")}
            />
            <TextField
              {...register("complement")}
              id="outlined-required"
              label="Complemento"
            />
          </FlexBetween>
        </Box>
        <SaveButton />
      </Box>
    </Grid>
  );
}
