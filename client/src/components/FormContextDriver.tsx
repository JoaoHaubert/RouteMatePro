import React, { createContext, useState, useContext } from "react";
import { z, ZodType } from "zod";
import { FormDataDriver } from "@/types";

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

  const submitForms = () => {
    //Validation with Zod schema
    const validationResult = formSchema.safeParse(formData);

    if (validationResult.success) {
      console.log("Form data:", formData);
    } else {
      console.error("Form errors:", validationResult.error.formErrors);
    }
  };

  return (
    <FormDriverContext.Provider value={{ formData, setFormData, submitForms }}>
      {children}
    </FormDriverContext.Provider>
  );
};
