import styled from "styled-components";

export const Inner = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  background: #fdefe9;
  border-radius: 20px;
  padding: 1rem;
  min-height: 100px;
  position: relative;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    border-bottom: 1px solid #3c658c;

    p {
      font-size: 0.8em;
      padding: 5px 0;
    }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .inner {
    height: 150px;
    overflow-y: scroll;
    padding: 0 0.5rem;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 6px;
      margin-block: 20px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(18, 74, 128, 0.1);
      border-radius: 20px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(18, 74, 128, 0.5);
      opacity: 0.5;
      border-radius: 20px;
    }
  }
`;

export const Send = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  background: var(--btn-color);
  color: var(--white);
  padding: 0.5rem 1.6rem;
  border-radius: 3px;

  &.not-allowed {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export const Price = styled.div`
  margin-top: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.8em;
  font-weight: 600;
  color: var(--text-color);
`;
