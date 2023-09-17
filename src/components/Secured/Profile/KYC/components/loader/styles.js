import styled from "styled-components";

export const SkeletonPulse = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  background: linear-gradient(-90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
  background-size: 400% 400%;
  animation: pulse 1.2s ease-in infinite;
  overflow: hidden;

  border-radius: ${({ border }) => border && `${border}px`};
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -140% 0%;
    }
  }
`;

export const SkeletonText = styled.div`
  height: 25px;
  width: 25px;
  margin: 13px 0;
`;

export const SkeletonInput = styled.div`
  margin-bottom: 20px;
  height: 40px;
  width: 280px;
`;
