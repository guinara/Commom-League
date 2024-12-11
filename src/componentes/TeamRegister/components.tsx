import styled from 'styled-components';
import { Form as FormikForm } from 'formik';

const StyledForm = styled(FormikForm)`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export default StyledForm;
