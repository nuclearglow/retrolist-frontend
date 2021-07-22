import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const FormStyles = styled.form`
    fieldset {
        margin: 5px 0;

        &[disabled] {
            opacity: 0.5;
        }

        &::before {
            height: 5px;
            content: '';
            display: block;
            margin-bottom: 10px;

            background-image: linear-gradient(
                to right,
                #ff55ff 0%,
                #55ffff 50%,
                #ff55ff 100%
            );
        }

        &[aria-busy='true']::before {
            background-size: 50% auto;
            animation: ${loading} 0.5s linear infinite;
        }
    }
`;

export default FormStyles;
