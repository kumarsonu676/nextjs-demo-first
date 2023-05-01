export default interface ContactModel {
  name: string;
  email: string;
  countryId: number;
  tags: string[];
  address: AddressModel[];
  isActive: boolean;
  gender: string;
  profilePicture: FileList;
  recaptcha: string;
}

export interface AddressModel {
  addressLine1: string;
  addressLine2: string;
  city: string;
}
