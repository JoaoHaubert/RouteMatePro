import React, { createContext, useState, useContext } from "react";
import { z, ZodType } from "zod";
import { FormDataShop } from "@/types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema: ZodType<FormDataShop> = z.object({
  storeName: z.string().nonempty("Campo necessário para o cadastro"),
  storePhone: z.string().nonempty("Campo necessário para o cadastro"),
  storeEmail: z.string().email().nonempty("Campo necessário para o cadastro"),
  storeAddress: z.string(),
  storeNumber: z.string().nonempty("Campo necessário para o cadastro"),
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
    storeNumber: "",
    storeCity: "",
    storeState: "",
  });

  const submitForms = async () => {
    try {
      // Validate form data using Zod schema
      const validationResult = formSchema.safeParse(formData);

      if (validationResult.success) {
        // Form data is valid, proceed to save
        const response = await axios.post(
          "http://localhost:5001/create-shop",
          formData
        );
        toast.success("Loja adicionada com sucesso!", {
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
        toast.error("Falha ao adicionar a loja.", {
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
    <FormShopContext.Provider value={{ formData, setFormData, submitForms }}>
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
    </FormShopContext.Provider>
  );
};
