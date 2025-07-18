import styled from "styled-components";

export const Container = styled.div<{ $size: number; }>`
  .checkbox-wrapper input[type="checkbox"] {
    display: none;
    visibility: hidden;
  }

  .checkbox-wrapper label {
    margin: auto;
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
  }
  .checkbox-wrapper label span {
    display: inline-block;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
  }
  .checkbox-wrapper label span:first-child {
    position: relative;
    width: ${props => props.$size}px;
    height: ${props => props.$size}px;
    border-radius: 3px;
    transform: scale(1);
    vertical-align: middle;
    border: 1px solid #9098a9;
    transition: all 0.2s ease;
  }
  .checkbox-wrapper label span:first-child svg {
    position: absolute;
    top: ${props => props.$size * 0.17}px;
    left: ${props => props.$size * 0.11}px;
    fill: none;
    stroke: #ffffff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0);
  }
  .checkbox-wrapper label span:first-child p {
    all: unset;
    position: absolute;
    top: 50%;
    left: 50%;
    fill: none;
    stroke: #ffffff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: ${props => props.$size * 0.9}px;
    stroke-dashoffset: ${props => props.$size * 0.9}px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate(-50%, -50%);
  }
  .checkbox-wrapper label span:first-child:before {
    content: "";
    width: 100%;
    height: 100%;
    background: var(--color-ring);
    display: block;
    transform: scale(0);
    opacity: 1;
    border-radius: 50%;
  }
  .checkbox-wrapper label span:last-child {
    padding-left: 8px;
  }
  .checkbox-wrapper label:hover span:first-child {
    border-color: var(--color-ring);
  }

  .checkbox-wrapper input:checked + label span:first-child {
    background: var(--color-ring);
    border-color: var(--color-ring);
    animation: wave-46 0.4s ease;
  }
  .checkbox-wrapper input:checked + label span:first-child svg {
    stroke-dashoffset: 0;
  }
  .checkbox-wrapper input:checked + label span:first-child:before {
    transform: scale(2.8);
    opacity: 0;
    transition: all 0.6s ease;
  }

  @keyframes wave-46 {
    50% {
      transform: scale(0.9);
    }
  }
`;
