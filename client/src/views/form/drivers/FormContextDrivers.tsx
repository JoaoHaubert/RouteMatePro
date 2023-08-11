import React, { useState, useContext, createContext } from 'react'
import { z, ZodType } from 'zod'
import { FormDataDriver } from '@/types';

const formSchema: ZodType<FormDataDriver> = z.object({
    fullName: z.string().nonempty("Campo necessário para o cadastro"),
    phone: z.string().nonempty("Campo necessário para o cadastro"),
    license: z.string().nonempty("Campo necessário para o cadastro"),
    email: z.string()
  });
  
  interface FormContextValue {
    formData: FormDataDriver;
    setFormData: React.Dispatch<React.SetStateAction<FormDataDriver>>;
    submitForms: () => void;
  }
  
  const FormContext = createContext<FormContextValue | undefined>(undefined);
  
  export const useFormContext = () => {
      const context = useContext(FormContext);
      if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
      }
      return context;
    };
  
  export const FormProvider: React.FC = ({ children }: any) => {
    const [formData, setFormData] = useState<FormDataDriver>({
      fullName: "",
      phone: "",
      license: "",
      email: "",
    
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
      <FormContext.Provider value={{formData ,setFormData, submitForms}}>
        {children}
      </FormContext.Provider>
    );
  };
  