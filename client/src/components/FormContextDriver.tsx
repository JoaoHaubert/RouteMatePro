import React, { createContext, useState, useContext } from "react";
import { z, ZodType } from "zod";
import { FormDataDriver } from "@/types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema: ZodType<FormDataDriver> = z.object({
  fullName: z
    .string()
    .nonempty({ message: "Campo necessário para o cadastro" }),
  phone: z.string().nonempty({ message: "Campo necessário para o cadastro" }),
  license: z.string().nonempty({ message: "Campo necessário para o cadastro" }),
  email: z
    .string()
    .email("e-mail inválido.")
    .nonempty({ message: "Campo necessário para o cadastro" }),
  address: z.string(),
  city: z.string(),
  postCode: z
    .string()
    .nonempty({ message: "Campo necessário para o cadastro" }),
  state: z.string(),
  birthDate: z.string(),
  id: z.string().nonempty({ message: "Campo necessário para o cadastro"}),
  number: z.string().nonempty({ message: "Campo necessário para o cadastro" }),
  complement: z.string(),
});

interface FormContextValue {
  formData: FormDataDriver;
  setFormData: React.Dispatch<React.SetStateAction<FormDataDriver>>;
  submitForms: () => void;
}

const FormDriverContext = createContext<FormContextValue | undefined>(
  undefined
);

export const useFormDriverContext = () => {
  const driverContext = useContext(FormDriverContext);
  if (!driverContext) {
    throw new Error("useFormDriverContext must be used within a FormProvider");
  }
  return driverContext;
};

export const FormDriverProvider: React.FC = ({ children }: any) => {
  const [formData, setFormData] = useState<FormDataDriver>({
    fullName: "",
    phone: "",
    license: "",
    email: "",
    address: "",
    city: "",
    birthDate: "",
    postCode: "",
    state: "",
    id: "",
    number: "",
    complement: "",
  });

  const submitForms = async () => {
    try {
      // Validate form data using Zod schema
      const validationResult = formSchema.safeParse(formData);

      if (validationResult.success) {
        // Form data is valid, proceed to save
        const response = await axios.post(
          "http://localhost:5001/create-driver",
          formData
        );
        toast.success("Condutor(a) adicionado(a) com sucesso!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log("Form data saved:", response.data.message);
      } else {
        // Form data is invalid, log errors
        toast.error("Falha ao adicionar o condutor(a).", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        toast.warning("Atenção! Campos com * são obrigatórios.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.error("Form errors:", validationResult.error.formErrors);
      }
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  return (
    <FormDriverContext.Provider value={{ formData, setFormData, submitForms }}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </FormDriverContext.Provider>
  );
};
