import styled from "styled-components";
const Select = styled.select`
  width: 100%;
  border-radius: 4px;

  border: ${({ error }) =>
    error ? `1px solid red` : `1px solid var(--text-color)`};
  padding: 10px 30px 10px 10px;
  color: #000;
  background-position: right 10px center;
  background-repeat: no-repeat;
  background-size: auto 50%;
  background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSdibGFjaycgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDI0IDI0JyB3aWR0aD0nMjQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTcgMTBsNSA1IDUtNXonLz48cGF0aCBkPSdNMCAwaDI0djI0SDB6JyBmaWxsPSdub25lJy8+PC9zdmc+);
  padding: 10px 30px 10px 10px;
  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
`;

const BoldText = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: var(--btn-color);
  margin: 10px 0;
  ${({ textStyle }) => textStyle && textStyle};
`;

export { Select, BoldText };
