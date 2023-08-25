import React, { createContext, useState, useContext } from "react";
import { z, ZodType } from "zod";
import { FormDataDriver } from "@/types";
import axios from "axios";

const formSchema: ZodType<FormDataDriver> = z.object({
  fullName: z.string().nonempty("Campo necessário para o cadastro"),
  phone: z.string().nonempty("Campo necessário para o cadastro"),
  license: z.string().nonempty("Campo necessário para o cadastro"),
  email: z.string(),
  address: z.string(),
  city: z.string(),
  postCode: z.string().nonempty("Campo necessário para o cadastro"),
  state: z.string(),
  birthDate: z.string(),
  id: z.string(),
  number: z.string().nonempty("Campo necessário para o cadastro"),
  complement: z.string(),
});

interface FormContextValue {
  formData: FormDataDriver;
  setFormData: React.Dispatch<React.SetStateAction<FormDataDriver>>;
  submitForms: () => void;
}

const FormDriverContext = createContext<FormContextValue | undefined>(undefined);

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
    birthDate:"",
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
        const response = await axios.post("http://localhost:5001/create-driver", formData);
        console.log("Form data saved:", response.data.message);
      } else {
        // Form data is invalid, log errors
        console.error("Form errors:", validationResult.error.formErrors);
      }
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  return (
    <FormDriverContext.Provider value={{ formData, setFormData, submitForms }}>
      {children}
    </FormDriverContext.Provider>
  );
};
