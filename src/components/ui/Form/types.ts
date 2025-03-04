export interface FormData {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  message: string;
}

export interface FormProps {
  onSubmit?: (data: FormData) => void;
}