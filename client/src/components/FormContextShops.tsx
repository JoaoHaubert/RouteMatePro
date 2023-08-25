import React, { createContext, useState, useContext } from "react";
import { z, ZodType } from "zod";
import { FormDataShop } from "@/types";
import axios from "axios";

const formSchema: ZodType<FormDataShop> = z.object({
  storeName: z.string().nonempty("Campo necessário para o cadastro"),
  storePhone: z.string().nonempty("Campo necessário para o cadastro"),
  storeEmail: z.string(),
  storeAddress: z.string(),
  storeCity: z.string(),
  storePost: z.string().nonempty("Campo necessário para o cadastro"),
  storeState: z.string(),
  storeType: z.string().nonempty("Campo necessário para o cadastro"),
});

interface FormContextValue {
  formData: FormDataShop;
  setFormData: React.Dispatch<React.SetStateAction<FormDataShop>>;
  submitForms: () => void;
}

const FormShopContext = createContext<FormContextValue | undefined>(undefined);

export const useFormShopContext = () => {
  const shopContext = useContext(FormShopContext);
  if (!shopContext) {
    throw new Error("useFormShopContext must be used within a FormProvider");
  }
  return shopContext;
};

export const FormShopProvider: React.FC = ({ children }: any) => {
  const [formData, setFormData] = useState<FormDataShop>({
    storeName: "",
    storePhone: "",
    storeEmail: "",
    storeType: "",
    storePost: "",
    storeAddress: "",
    storeCity: "",
    storeState: "",
  });

  const submitForms = async () => {
    try {
      // Validate form data using Zod schema
      const validationResult = formSchema.safeParse(formData);
  
      if (validationResult.success) {
        // Form data is valid, proceed to save
        const response = await axios.post("http://localhost:5001/create-shop", formData);
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
    <FormShopContext.Provider value={{ formData, setFormData, submitForms }}>
      {children}
    </FormShopContext.Provider>
  );
};
