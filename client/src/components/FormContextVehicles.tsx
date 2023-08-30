import React, { createContext, useState, useContext } from "react";
import { z, ZodType } from "zod";
import { FormData } from "@/types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema: ZodType<FormData> = z.object({
  vehicleName: z
    .string()
    .nonempty({ message: "Campo necessário para o cadastro" }),
  vehicleType: z
    .string()
    .nonempty({ message: "Campo necessário para o cadastro" }),
  vehicleConsume: z
    .string()
    .nonempty({ message: "Campo necessário para o cadastro" }),
  vehicleOdometer: z
    .string()
    .nonempty({ message: "Campo necessário para o cadastro" }),
  vehicleLoadCap: z.string(),
  vehicleTag: z.string(),
  vehicleStatus: z.string(),
  vehicleGroup: z.string(),
  vehicleOwnership: z.string(),
  vehicleBrand: z.string(),
});

interface FormContextValue {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  submitForms: () => void;
  validationResults: z.infer<typeof formSchema> | undefined;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider: React.FC = ({ children }: any) => {
  const [formData, setFormData] = useState<FormData>({
    vehicleName: "",
    vehicleTag: "",
    vehicleType: "",
    vehicleStatus: "",
    vehicleOwnership: "",
    vehicleGroup: "",
    vehicleBrand: "",
    vehicleConsume: "",
    vehicleLoadCap: "",
    vehicleOdometer: "",
  });

  // Validate form data using Zod schema
  const validationResult = formSchema.safeParse(formData);

  const submitForms = async () => {
    try {
      if (validationResult.success) {
        // Form data is valid, proceed to save
        const response = await axios.post(
          "http://localhost:5001/create-vehicle",
          formData
        );
        toast.success("Veículo adicionado com sucesso!", {
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
        toast.error("Falha ao adicionar o veículo.", {
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
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        submitForms,
        validationResults: validationResult.success
          ? validationResult.data
          : undefined,
      }}
    >
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
    </FormContext.Provider>
  );
};
