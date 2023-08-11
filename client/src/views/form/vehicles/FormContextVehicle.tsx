
import React, { createContext, useState, useContext } from "react";
import { z, ZodType } from "zod";
import { FormDataVehicle } from "@/types";

const formSchema: ZodType<FormDataVehicle> = z.object({
  vehicleName: z.string().nonempty("Campo necessário para o cadastro"),
  vehicleType: z.string().nonempty("Campo necessário para o cadastro"),
  vehicleTag: z.string(),
  vehicleStatus: z.string(),
  vehicleGroup: z.string(),
  vehicleOwnership: z.string(),
  vehicleBrand: z.string(),
  vehicleConsume: z.string(),
  vehicleLoadCap: z.string(),
  vehicleOdometer: z.string(), 
});

interface FormContextValue {
  formData: FormDataVehicle;
  setFormData: React.Dispatch<React.SetStateAction<FormDataVehicle>>;
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
  const [formData, setFormData] = useState<FormDataVehicle>({
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
