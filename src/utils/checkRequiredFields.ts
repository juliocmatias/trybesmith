type RequiredFields = string[];
type ReceivedFields = { [key: string]: string };

const checkRequiredFields = (
  receivedFields: ReceivedFields, 
  requiredFields: RequiredFields,
): string | null => {
  for (let i = 0; i < requiredFields.length; i += 1) {
    const currentField = requiredFields[i];
    if (!(currentField in receivedFields) 
    || receivedFields[currentField] === ''
    || receivedFields[currentField] === undefined
    ) {
      return `"${currentField}" is required`;
    }
  }
  return null;
};

export default checkRequiredFields;