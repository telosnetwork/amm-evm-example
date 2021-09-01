import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <Svg viewBox="0 0 61 34" height="34px" width="61px" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/*<svg width="61" height="20" viewBox="0 0 61 20" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
{/*<svg width="61" height="34" viewBox="0 0 61 34" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
<path d="M6.58976 19.5348H8.59533V17.7376H6.71999C5.1572 17.7376 4.61022 16.8781 4.61022 15.4195V7.7358H8.77766V5.99069H4.61022V2.05767H2.68279V5.31348C2.68279 5.75627 2.39627 5.99069 2.03162 5.99069H0V7.7358H2.55255V15.4456C2.55255 18.1804 4.08929 19.5348 6.58976 19.5348Z" fill="#071A5F"/>
<path d="M18.1481 19.8735C21.3257 19.8735 23.696 18.0762 24.4513 15.5497H22.3155C21.6904 17.1386 19.9713 17.9981 18.1741 17.9981C15.3872 17.9981 13.642 16.2009 13.5379 13.4921H24.5816V12.5804C24.5816 8.67347 22.1332 5.65208 18.0178 5.65208C14.3192 5.65208 11.376 8.43906 11.376 12.7628C11.376 16.826 14.0067 19.8735 18.1481 19.8735ZM13.5899 11.6688C13.7983 9.16836 15.7518 7.52743 18.0178 7.52743C20.3099 7.52743 22.2113 8.95998 22.3937 11.6688H13.5899Z" fill="#071A5F"/>
<path d="M30.1333 19.5348H31.1231V17.7116H30.498C29.8468 17.7116 29.5082 17.3209 29.5082 16.6437V0H27.4505V16.6437C27.4505 18.493 28.4403 19.5348 30.1333 19.5348Z" fill="#071A5F"/>
<path d="M55.7386 19.8735C58.8902 19.8735 61 18.1544 61 15.6018C61 10.0018 52.8735 12.867 52.8735 9.42882C52.8735 8.25673 53.9675 7.42324 55.6605 7.42324C57.4577 7.42324 58.4214 8.28278 58.6037 9.55905H60.5833C60.3749 7.11068 58.2912 5.65208 55.7907 5.65208C52.9516 5.65208 50.894 7.13673 50.894 9.42882C50.894 14.7944 58.9944 11.9032 58.9944 15.706C58.9944 17.0865 57.8744 18.0762 55.8428 18.0762C53.8633 18.0762 52.7172 17.2167 52.4828 15.6018H50.4772C50.7116 18.1283 52.5349 19.8735 55.7386 19.8735Z" fill="#071A5F"/>
<g filter="url(#filter0_i)">
<circle cx="40.6288" cy="12.7095" r="7.1846" fill="url(#paint0_linear)"/>
</g>
{/*<circle cx="40.6288" cy="12.7095" r="7.03695" stroke="url(#paint1_linear)" strokeOpacity="0.12" strokeWidth="0.295303"/>*/}
<path d="M30.5566 30.104C31.7806 30.104 32.5006 29.4 32.5006 28.52C32.5006 26.256 29.3966 27.32 29.3966 25.792C29.3966 25.328 29.7406 24.888 30.5326 24.888C31.2926 24.888 31.7166 25.28 31.7166 25.92H32.3806C32.3806 24.76 31.3886 24.296 30.5406 24.296C29.4126 24.296 28.7486 24.992 28.7486 25.792C28.7486 28.032 31.8446 26.808 31.8446 28.56C31.8446 29.144 31.3166 29.504 30.5806 29.504C29.7326 29.504 29.2046 28.984 29.2046 28.336H28.5566C28.5566 29.376 29.4446 30.104 30.5566 30.104ZM37.6918 30H38.5318L39.7878 25.272H39.8358L41.0918 30H41.9318L43.3638 24.4H42.6678L41.5238 29.208H41.4758L40.2198 24.4H39.4038L38.1478 29.208H38.0998L36.9558 24.4H36.2598L37.6918 30ZM46.7254 30H47.4054L47.9094 28.672H50.6134L51.1174 30H51.7974L49.6454 24.4H48.8854L46.7254 30ZM48.1334 28.08L49.2374 25.152H49.2854L50.3894 28.08H48.1334ZM55.956 30H56.604V27.784H57.964C58.948 27.784 59.676 27.088 59.676 26.08C59.676 25.064 58.98 24.4 57.964 24.4H55.956V30ZM56.604 27.208V24.976H57.908C58.58 24.976 59.012 25.44 59.012 26.08C59.012 26.728 58.58 27.208 57.908 27.208H56.604Z" fill="#8946DF"/>
<defs>
<filter id="filter0_i" x="31.0818" y="5.5249" width="16.7316" height="14.3692" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-3.54363"/>
<feGaussianBlur stdDeviation="1.18121"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.682353 0 0 0 0 0.45098 0 0 0 0 0.980392 0 0 0 0.56 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
</filter>
<linearGradient id="paint0_linear" x1="33.4442" y1="12.7095" x2="47.8134" y2="12.7095" gradientUnits="userSpaceOnUse">
<stop stopColor="#AE73FA"/>
<stop offset="1" stopColor="#AE73FA" stopOpacity="0"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="47.8134" y1="12.7095" x2="33.4442" y2="12.7095" gradientUnits="userSpaceOnUse">
<stop stopColor="#AE73FA"/>
<stop offset="1" stopColor="#AE73FA" stopOpacity="0"/>
</linearGradient>
</defs>



{/*</svg>*/}


      {/*<g id="svgGroup" strokeLinecap="round" fillRule="evenodd" fontSize="9pt" stroke="#000" strokeWidth="0.25mm" fill={textColor} >*/}
      {/*  <path fill={textColor} d="M 0.14 13.96 L 0 13.84 L 0 0.38 L 0.14 0.26 Q 2.44 0.18 4.78 0.18 A 7.276 7.276 0 0 1 6.057 0.298 A 8.841 8.841 0 0 1 6.71 0.44 Q 7.579 0.664 8.159 1.065 A 3.066 3.066 0 0 1 8.34 1.2 A 5.343 5.343 0 0 1 9.563 2.579 A 4.877 4.877 0 0 1 10.05 3.66 Q 10.5 5.1 10.5 7.11 A 15.127 15.127 0 0 1 10.426 8.651 Q 10.317 9.709 10.05 10.57 A 5.024 5.024 0 0 1 8.494 12.911 A 6.103 6.103 0 0 1 8.34 13.04 A 3.382 3.382 0 0 1 7.648 13.466 Q 7.312 13.623 6.909 13.737 A 6.146 6.146 0 0 1 6.71 13.79 Q 5.7 14.04 4.66 14.04 A 53.101 53.101 0 0 1 4.088 14.036 Q 2.859 14.023 0.14 13.96 Z M 2.54 2.18 L 2.54 12.02 L 4.76 12.02 A 3.555 3.555 0 0 0 5.516 11.944 A 2.566 2.566 0 0 0 6.38 11.59 A 2.505 2.505 0 0 0 7.34 10.414 A 3.044 3.044 0 0 0 7.35 10.39 Q 7.66 9.62 7.77 8.85 A 10.474 10.474 0 0 0 7.852 8.037 Q 7.878 7.626 7.88 7.171 A 16.927 16.927 0 0 0 7.88 7.11 A 14.682 14.682 0 0 0 7.854 6.217 Q 7.827 5.767 7.77 5.37 Q 7.66 4.6 7.35 3.83 Q 7.04 3.06 6.38 2.63 Q 5.891 2.312 5.118 2.229 A 5.446 5.446 0 0 0 4.54 2.2 A 116.584 116.584 0 0 1 3.706 2.197 Q 3.379 2.195 3.088 2.191 A 56.988 56.988 0 0 1 2.54 2.18 Z" id="0" vectorEffect="non-scaling-stroke"/>*/}
      {/*  <path fill={textColor} d="M 20.34 9.78 L 14.74 9.78 A 5.222 5.222 0 0 0 14.818 10.466 Q 14.947 11.163 15.27 11.61 Q 15.653 12.14 16.507 12.238 A 3.623 3.623 0 0 0 16.92 12.26 Q 18.1 12.26 19.54 11.56 A 2.24 2.24 0 0 1 20.043 12.307 Q 20.172 12.608 20.241 12.974 A 4.107 4.107 0 0 1 20.26 13.08 A 6.107 6.107 0 0 1 17.511 14.147 A 8 8 0 0 1 16.41 14.22 A 5.431 5.431 0 0 1 15.186 14.091 Q 14.383 13.906 13.814 13.452 A 3.054 3.054 0 0 1 13.18 12.76 A 5.444 5.444 0 0 1 12.432 11.033 Q 12.251 10.311 12.211 9.464 A 10.356 10.356 0 0 1 12.2 8.98 Q 12.2 6.66 13.28 5.2 A 3.5 3.5 0 0 1 15.852 3.766 A 5.061 5.061 0 0 1 16.37 3.74 A 5.345 5.345 0 0 1 17.616 3.877 A 3.494 3.494 0 0 1 19.46 4.95 A 4.212 4.212 0 0 1 20.495 7.279 A 5.675 5.675 0 0 1 20.54 8 Q 20.54 8.92 20.34 9.78 Z M 14.72 8.02 L 18.2 8.02 L 18.2 7.78 Q 18.2 6.985 17.935 6.431 A 2.086 2.086 0 0 0 17.78 6.16 A 1.366 1.366 0 0 0 16.831 5.568 A 2.129 2.129 0 0 0 16.48 5.54 Q 14.861 5.54 14.723 7.956 A 7.383 7.383 0 0 0 14.72 8.02 Z" id="1" vectorEffect="non-scaling-stroke"/>*/}
      {/*  <path fill={textColor} d="M 28.2 13.94 L 28.2 7.78 Q 28.2 6.609 27.687 6.244 A 0.954 0.954 0 0 0 27.12 6.08 Q 26.24 6.08 25.3 7.08 L 25.3 13.94 A 6.371 6.371 0 0 1 24.58 14.025 A 7.973 7.973 0 0 1 24.08 14.04 A 7.866 7.866 0 0 1 23.085 13.979 A 6.983 6.983 0 0 1 22.82 13.94 L 22.82 4.06 L 22.96 3.92 L 23.88 3.92 A 1.598 1.598 0 0 1 24.444 4.013 Q 24.905 4.186 25.121 4.683 A 2.129 2.129 0 0 1 25.26 5.16 A 5.65 5.65 0 0 1 26.224 4.409 Q 26.955 3.964 27.719 3.867 A 3.415 3.415 0 0 1 28.15 3.84 A 2.452 2.452 0 0 1 29.156 4.038 Q 29.912 4.375 30.34 5.28 A 6.536 6.536 0 0 1 31.381 4.475 Q 32.418 3.84 33.48 3.84 A 2.875 2.875 0 0 1 34.293 3.949 A 2.124 2.124 0 0 1 35.41 4.72 A 3.151 3.151 0 0 1 35.961 5.911 Q 36.069 6.363 36.079 6.89 A 5.724 5.724 0 0 1 36.08 7 L 36.08 11.68 A 5.985 5.985 0 0 0 36.119 12.384 Q 36.159 12.722 36.241 13.002 A 2.346 2.346 0 0 0 36.48 13.56 Q 35.86 14.08 35.03 14.08 Q 34.305 14.08 33.984 13.79 A 0.737 0.737 0 0 1 33.9 13.7 A 1.174 1.174 0 0 1 33.717 13.356 Q 33.607 13.041 33.6 12.582 A 4.138 4.138 0 0 1 33.6 12.52 L 33.6 7.76 A 3.842 3.842 0 0 0 33.561 7.189 Q 33.451 6.458 33.024 6.209 A 1.022 1.022 0 0 0 32.5 6.08 A 1.634 1.634 0 0 0 31.822 6.239 Q 31.331 6.462 30.798 6.998 A 6.326 6.326 0 0 0 30.68 7.12 L 30.68 13.94 A 6.371 6.371 0 0 1 29.96 14.025 A 7.973 7.973 0 0 1 29.46 14.04 A 7.866 7.866 0 0 1 28.465 13.979 A 6.983 6.983 0 0 1 28.2 13.94 Z" id="2" vectorEffect="non-scaling-stroke"/>*/}
      {/*  <path fill={textColor} d="M 45.66 4.88 Q 47.08 6.3 47.08 8.98 A 8.088 8.088 0 0 1 46.931 10.585 Q 46.739 11.533 46.3 12.261 A 4.274 4.274 0 0 1 45.66 13.08 A 3.828 3.828 0 0 1 43.486 14.158 A 5.382 5.382 0 0 1 42.65 14.22 A 4.975 4.975 0 0 1 41.301 14.046 A 3.737 3.737 0 0 1 39.64 13.08 Q 38.22 11.66 38.22 8.98 A 8.088 8.088 0 0 1 38.369 7.375 Q 38.561 6.427 39 5.699 A 4.274 4.274 0 0 1 39.64 4.88 A 3.828 3.828 0 0 1 41.814 3.803 A 5.382 5.382 0 0 1 42.65 3.74 A 4.975 4.975 0 0 1 43.999 3.914 A 3.737 3.737 0 0 1 45.66 4.88 Z M 42.65 5.62 A 1.557 1.557 0 0 0 41.162 6.597 Q 40.82 7.307 40.769 8.533 A 10.759 10.759 0 0 0 40.76 8.98 A 8.924 8.924 0 0 0 40.826 10.122 Q 40.983 11.331 41.511 11.881 A 1.508 1.508 0 0 0 42.65 12.34 A 1.557 1.557 0 0 0 44.138 11.364 Q 44.48 10.654 44.531 9.427 A 10.759 10.759 0 0 0 44.54 8.98 A 8.924 8.924 0 0 0 44.474 7.838 Q 44.317 6.629 43.789 6.079 A 1.508 1.508 0 0 0 42.65 5.62 Z" id="3" vectorEffect="non-scaling-stroke"/>*/}
      {/*  <path fill={textColor} d="M 54 8.56 L 51.64 7.56 Q 48.86 6.32 48.86 4 A 3.594 3.594 0 0 1 49.982 1.322 A 4.489 4.489 0 0 1 50.18 1.14 A 4.566 4.566 0 0 1 52.247 0.138 A 6.592 6.592 0 0 1 53.63 0 A 9.019 9.019 0 0 1 56.707 0.558 A 11.249 11.249 0 0 1 57.92 1.08 Q 57.86 2.26 57.04 3.04 Q 55.514 2.277 54.202 2.121 A 5.588 5.588 0 0 0 53.54 2.08 Q 52.817 2.08 52.328 2.336 A 1.702 1.702 0 0 0 52.01 2.55 Q 51.46 3.02 51.46 3.68 A 1.294 1.294 0 0 0 51.836 4.583 Q 52.201 4.975 52.92 5.28 L 55.28 6.28 A 7.094 7.094 0 0 1 56.627 7.032 Q 57.389 7.584 57.8 8.279 A 3.513 3.513 0 0 1 58.28 10.1 A 4.222 4.222 0 0 1 58.036 11.564 A 3.684 3.684 0 0 1 56.98 13.08 Q 55.97 13.966 54.205 14.163 A 9.678 9.678 0 0 1 53.13 14.22 A 8.429 8.429 0 0 1 48.445 12.79 A 10.167 10.167 0 0 1 48.34 12.72 Q 48.48 11.54 49.38 10.8 A 9.654 9.654 0 0 0 50.984 11.63 Q 52.015 12.04 53.011 12.107 A 5.776 5.776 0 0 0 53.4 12.12 Q 54.134 12.12 54.639 11.891 A 1.821 1.821 0 0 0 55.02 11.66 A 1.527 1.527 0 0 0 55.446 11.149 Q 55.6 10.842 55.6 10.46 A 1.651 1.651 0 0 0 55.601 10.404 Q 55.601 9.481 54.554 8.845 A 4.724 4.724 0 0 0 54 8.56 Z" id="4" vectorEffect="non-scaling-stroke"/>*/}
      {/*  <path fill={textColor} d="M 61.02 12.78 L 59 4.18 A 4.241 4.241 0 0 1 59.563 3.974 Q 59.863 3.889 60.139 3.867 A 2.358 2.358 0 0 1 60.32 3.86 A 2.277 2.277 0 0 1 60.63 3.88 Q 60.996 3.93 61.19 4.11 A 1.041 1.041 0 0 1 61.388 4.367 Q 61.51 4.584 61.58 4.9 L 62.36 8.7 Q 62.78 10.56 62.96 11.94 A 0.352 0.352 0 0 0 62.982 12.004 Q 62.998 12.038 63.02 12.06 A 0.136 0.136 0 0 0 63.12 12.1 L 64.58 4.1 Q 64.952 4.007 65.637 3.986 A 13.906 13.906 0 0 1 66.06 3.98 Q 67.06 3.98 67.52 4.1 L 68.94 11.94 A 0.352 0.352 0 0 0 68.962 12.004 Q 68.978 12.038 69 12.06 A 0.136 0.136 0 0 0 69.1 12.1 Q 69.587 9.536 69.74 8.794 A 20.23 20.23 0 0 1 69.76 8.7 L 70.78 4.02 A 3.379 3.379 0 0 1 71.114 3.963 Q 71.464 3.92 71.93 3.92 Q 72.388 3.92 72.717 4.003 A 1.597 1.597 0 0 1 73.04 4.12 L 73.12 4.26 L 70.72 13.94 Q 70.147 14.036 69.201 14.04 A 19.843 19.843 0 0 1 69.11 14.04 A 6.691 6.691 0 0 1 68.658 14.026 Q 68.01 13.982 67.73 13.8 A 0.835 0.835 0 0 1 67.479 13.536 Q 67.313 13.271 67.24 12.82 L 66.76 10.28 Q 66.42 8.3 66.1 6.28 L 65.98 6.28 Q 65.801 7.594 65.285 10.237 A 178.559 178.559 0 0 1 65.28 10.26 L 64.58 13.94 A 8.263 8.263 0 0 1 64.026 14.001 Q 63.723 14.025 63.375 14.034 A 17.437 17.437 0 0 1 62.91 14.04 A 6.166 6.166 0 0 1 62.467 14.025 Q 62.046 13.995 61.784 13.901 A 0.959 0.959 0 0 1 61.56 13.79 A 0.932 0.932 0 0 1 61.326 13.546 Q 61.136 13.268 61.02 12.78 Z" id="5" vectorEffect="non-scaling-stroke"/>*/}
      {/*  <path fill={textColor} d="M 79.62 7.94 L 79.62 7.34 Q 79.62 5.977 78.488 5.79 A 2.385 2.385 0 0 0 78.1 5.76 A 4.558 4.558 0 0 0 77.421 5.817 Q 76.688 5.929 75.682 6.258 A 21.037 21.037 0 0 0 75.04 6.48 Q 74.46 5.86 74.38 4.7 Q 76.54 3.8 78.7 3.8 Q 80.2 3.8 81.14 4.64 A 2.645 2.645 0 0 1 81.9 5.857 Q 82.035 6.292 82.069 6.819 A 5.661 5.661 0 0 1 82.08 7.18 L 82.08 11.26 A 3.399 3.399 0 0 0 82.122 11.814 Q 82.233 12.486 82.64 12.82 Q 82.54 13.16 82.29 13.53 A 3.22 3.22 0 0 1 82.093 13.793 Q 81.987 13.92 81.879 14.018 A 1.663 1.663 0 0 1 81.78 14.1 A 2.619 2.619 0 0 1 80.92 13.86 A 2.202 2.202 0 0 1 79.96 12.94 A 5.115 5.115 0 0 1 78.939 13.72 A 3.659 3.659 0 0 1 77.1 14.22 A 4.187 4.187 0 0 1 76.191 14.128 Q 75.606 13.998 75.176 13.684 A 2.364 2.364 0 0 1 74.78 13.32 Q 74 12.42 74 11.24 Q 74 9.56 75.09 8.71 Q 76.18 7.86 77.88 7.86 A 18.901 18.901 0 0 1 79.098 7.898 A 16.011 16.011 0 0 1 79.62 7.94 Z M 79.62 11.36 L 79.62 9.58 A 12.241 12.241 0 0 0 78.746 9.513 A 15.363 15.363 0 0 0 78.1 9.5 A 2.555 2.555 0 0 0 77.627 9.541 Q 77.36 9.592 77.152 9.704 A 1.25 1.25 0 0 0 76.86 9.92 A 1.418 1.418 0 0 0 76.442 10.891 A 1.882 1.882 0 0 0 76.44 10.98 A 2.056 2.056 0 0 0 76.474 11.369 Q 76.545 11.735 76.76 11.97 A 1.058 1.058 0 0 0 77.425 12.308 A 1.493 1.493 0 0 0 77.62 12.32 A 2.384 2.384 0 0 0 78.796 11.999 Q 79.136 11.809 79.468 11.506 A 4.749 4.749 0 0 0 79.62 11.36 Z" id="6" vectorEffect="non-scaling-stroke"/>*/}
      {/*  <path fill={textColor} d="M 87.28 13.56 L 87.28 16.72 Q 87.28 17.56 86.98 17.91 Q 86.691 18.247 85.975 18.26 A 3.194 3.194 0 0 1 85.92 18.26 L 84.98 18.26 L 84.84 18.12 L 84.84 4.04 L 84.98 3.92 L 85.68 3.92 A 1.684 1.684 0 0 1 86.272 4.018 Q 86.84 4.23 87.1 4.9 A 3.862 3.862 0 0 1 88.707 3.91 A 3.969 3.969 0 0 1 89.88 3.74 A 2.996 2.996 0 0 1 91.155 4.004 Q 91.788 4.297 92.253 4.918 A 3.819 3.819 0 0 1 92.4 5.13 A 5.004 5.004 0 0 1 92.999 6.486 Q 93.178 7.113 93.25 7.86 A 11.194 11.194 0 0 1 93.3 8.94 A 8.303 8.303 0 0 1 93.171 10.449 Q 92.917 11.824 92.16 12.74 A 4.12 4.12 0 0 1 91.206 13.601 A 3.288 3.288 0 0 1 89.4 14.12 A 4.223 4.223 0 0 1 88.018 13.879 A 5.492 5.492 0 0 1 87.28 13.56 Z M 87.28 6.86 L 87.28 11.6 A 4.954 4.954 0 0 0 87.892 11.94 Q 88.224 12.093 88.533 12.163 A 2.268 2.268 0 0 0 89.03 12.22 Q 89.82 12.22 90.29 11.35 A 3.295 3.295 0 0 0 90.567 10.632 Q 90.757 9.92 90.76 8.922 A 10.66 10.66 0 0 0 90.76 8.89 A 9.157 9.157 0 0 0 90.725 8.061 Q 90.636 7.086 90.32 6.54 A 1.977 1.977 0 0 0 90.044 6.164 A 1.155 1.155 0 0 0 89.18 5.78 A 2.107 2.107 0 0 0 87.754 6.338 A 3.32 3.32 0 0 0 87.28 6.86 Z" id="7"/>*/}
      {/*</g>*/}
      
      {/* <path*/}
      {/*  d="M30.8524 19.7569C30.4803 19.7569 30.2173 19.6799 30.0633 19.5259C29.9221 19.372 29.8516 19.1282 29.8516 18.7946V7.65066C29.8516 7.31705 29.9285 7.07326 30.0825 6.91928C30.2365 6.75248 30.4931 6.66907 30.8524 6.66907H35.5679C37.3642 6.66907 38.6858 7.04759 39.5327 7.80463C40.3796 8.56167 40.803 9.69082 40.803 11.1921C40.803 12.6805 40.3796 13.8032 39.5327 14.5603C38.6987 15.3045 37.3771 15.6766 35.5679 15.6766H33.7394V18.7946C33.7394 19.1282 33.6624 19.372 33.5085 19.5259C33.3545 19.6799 33.0914 19.7569 32.7193 19.7569H30.8524ZM35.2599 12.8858C35.786 12.8858 36.1902 12.7446 36.4725 12.4624C36.7676 12.1801 36.9151 11.7566 36.9151 11.1921C36.9151 10.6147 36.7676 10.1848 36.4725 9.90253C36.1902 9.62025 35.786 9.47911 35.2599 9.47911H33.7394V12.8858H35.2599Z"*/}
      {/*  fill={textColor}*/}
      {/* />*/}
      {/* <path*/}
      {/*  d="M45.3484 20.0456C44.1423 20.0456 43.1735 19.6607 42.4421 18.8908C41.7236 18.1081 41.3643 17.011 41.3643 15.5996C41.3643 14.5218 41.6081 13.5787 42.0957 12.7703C42.5961 11.9619 43.2954 11.3396 44.1936 10.9034C45.1046 10.4543 46.1503 10.2297 47.3308 10.2297C48.306 10.2297 49.1657 10.3388 49.9099 10.5569C50.6669 10.7622 51.3598 11.0638 51.9885 11.4615V19.1602C51.9885 19.404 51.9436 19.5644 51.8538 19.6414C51.764 19.7184 51.5844 19.7569 51.3149 19.7569H49.3517C49.2106 19.7569 49.1015 19.7376 49.0245 19.6992C48.9475 19.6478 48.8834 19.5708 48.8321 19.4682L48.5819 18.8908C48.2097 19.2886 47.7607 19.5773 47.2346 19.7569C46.7213 19.9494 46.0926 20.0456 45.3484 20.0456ZM46.7919 17.428C47.2923 17.428 47.6837 17.3061 47.966 17.0623C48.2482 16.8186 48.3894 16.4721 48.3894 16.023V13.0205C48.1456 12.905 47.8376 12.8473 47.4655 12.8473C46.7855 12.8473 46.2402 13.0847 45.8296 13.5594C45.4318 14.0342 45.2329 14.7014 45.2329 15.5611C45.2329 16.8057 45.7526 17.428 46.7919 17.428Z"*/}
      {/*  fill={textColor}*/}
      {/*/>*/}
      {/*<path*/}
      {/*  d="M54.667 19.7569C54.2949 19.7569 54.0319 19.6799 53.8779 19.5259C53.7239 19.372 53.6469 19.1282 53.6469 18.7946V11.1151C53.6469 10.8841 53.6854 10.7301 53.7624 10.6532C53.8522 10.5633 54.0318 10.5184 54.3013 10.5184H56.2837C56.4377 10.5184 56.5532 10.5441 56.6302 10.5954C56.72 10.6339 56.7713 10.7109 56.7841 10.8264L56.8804 11.4038C57.2397 11.0445 57.708 10.7622 58.2854 10.5569C58.8756 10.3388 59.53 10.2297 60.2486 10.2297C61.2879 10.2297 62.1283 10.5248 62.7699 11.1151C63.4115 11.6925 63.7322 12.5522 63.7322 13.6942V18.7946C63.7322 19.1282 63.6552 19.372 63.5013 19.5259C63.3601 19.6799 63.1035 19.7569 62.7314 19.7569H60.8645C60.4924 19.7569 60.2229 19.6799 60.0561 19.5259C59.9021 19.372 59.8251 19.1282 59.8251 18.7946V13.9444C59.8251 13.5594 59.7417 13.2836 59.5749 13.1167C59.4081 12.9499 59.1451 12.8665 58.7858 12.8665C58.4009 12.8665 58.0929 12.9692 57.862 13.1745C57.6438 13.3798 57.5348 13.6621 57.5348 14.0213V18.7946C57.5348 19.1282 57.4578 19.372 57.3038 19.5259C57.1627 19.6799 56.906 19.7569 56.5339 19.7569H54.667Z"*/}
      {/*  fill={textColor}*/}
      {/*/>*/}
      {/*<path*/}
      {/*  d="M70.5354 20.0456C68.739 20.0456 67.3532 19.6286 66.3781 18.7946C65.4029 17.9605 64.9153 16.748 64.9153 15.1569C64.9153 14.1817 65.1399 13.322 65.5889 12.5778C66.038 11.8336 66.686 11.2562 67.5329 10.8456C68.3926 10.435 69.4062 10.2297 70.5739 10.2297C71.4592 10.2297 72.2034 10.3131 72.8065 10.4799C73.4224 10.6467 73.9677 10.9034 74.4425 11.2498C74.5836 11.3396 74.6542 11.4551 74.6542 11.5963C74.6542 11.6989 74.6029 11.8336 74.5002 12.0004L73.7111 13.367C73.6213 13.5466 73.5122 13.6364 73.3839 13.6364C73.3069 13.6364 73.185 13.5851 73.0182 13.4824C72.6718 13.2643 72.3446 13.1039 72.0366 13.0013C71.7415 12.8986 71.3694 12.8473 70.9203 12.8473C70.2787 12.8473 69.7591 13.0526 69.3613 13.4632C68.9764 13.8738 68.7839 14.4384 68.7839 15.1569C68.7839 15.8883 68.9828 16.4529 69.3806 16.8506C69.7783 17.2356 70.3237 17.428 71.0165 17.428C71.4271 17.428 71.7992 17.3703 72.1329 17.2548C72.4665 17.1393 72.8065 16.9789 73.1529 16.7736C73.3326 16.671 73.4609 16.6197 73.5379 16.6197C73.6534 16.6197 73.756 16.7095 73.8458 16.8891L74.7119 18.3711C74.7761 18.4994 74.8082 18.6021 74.8082 18.6791C74.8082 18.7946 74.7312 18.9036 74.5772 19.0063C74.0383 19.3527 73.4481 19.6093 72.8065 19.7761C72.1778 19.9558 71.4207 20.0456 70.5354 20.0456Z"*/}
      {/*  fill={textColor}*/}
      {/*/>*/}
      {/*<path*/}
      {/*  d="M79.6881 20.0456C78.482 20.0456 77.5132 19.6607 76.7819 18.8908C76.0633 18.1081 75.704 17.011 75.704 15.5996C75.704 14.5218 75.9478 13.5787 76.4354 12.7703C76.9358 11.9619 77.6351 11.3396 78.5333 10.9034C79.4443 10.4543 80.4901 10.2297 81.6705 10.2297C82.6457 10.2297 83.5054 10.3388 84.2496 10.5569C85.0067 10.7622 85.6995 11.0638 86.3283 11.4615V19.1602C86.3283 19.404 86.2834 19.5644 86.1935 19.6414C86.1037 19.7184 85.9241 19.7569 85.6546 19.7569H83.6915C83.5503 19.7569 83.4412 19.7376 83.3643 19.6992C83.2873 19.6478 83.2231 19.5708 83.1718 19.4682L82.9216 18.8908C82.5495 19.2886 82.1004 19.5773 81.5743 19.7569C81.0611 19.9494 80.4323 20.0456 79.6881 20.0456ZM81.1316 17.428C81.632 17.428 82.0234 17.3061 82.3057 17.0623C82.588 16.8186 82.7291 16.4721 82.7291 16.023V13.0205C82.4853 12.905 82.1774 12.8473 81.8053 12.8473C81.1252 12.8473 80.5799 13.0847 80.1693 13.5594C79.7715 14.0342 79.5726 14.7014 79.5726 15.5611C79.5726 16.8057 80.0923 17.428 81.1316 17.428Z"*/}
      {/*  fill={textColor}*/}
      {/*/>*/}
      {/*<path*/}
      {/*  d="M98.4184 19.0255C98.5082 19.1282 98.5531 19.2436 98.5531 19.372C98.5531 19.4874 98.5146 19.5837 98.4377 19.6607C98.3607 19.7248 98.258 19.7569 98.1297 19.7569H95.1465C94.9668 19.7569 94.8321 19.7441 94.7423 19.7184C94.6653 19.6799 94.5819 19.6093 94.4921 19.5067L91.8745 15.946V18.7946C91.8745 19.1282 91.7975 19.372 91.6435 19.5259C91.4896 19.6799 91.2265 19.7569 90.8544 19.7569H88.9875C88.6154 19.7569 88.3523 19.6799 88.1984 19.5259C88.0572 19.372 87.9866 19.1282 87.9866 18.7946V7.65066C87.9866 7.31705 88.0636 7.07326 88.2176 6.91928C88.3716 6.75248 88.6282 6.66907 88.9875 6.66907H90.8544C91.2265 6.66907 91.4896 6.75248 91.6435 6.91928C91.7975 7.07326 91.8745 7.31705 91.8745 7.65066V14.0983L94.4151 10.7879C94.4921 10.6852 94.5755 10.6147 94.6653 10.5762C94.7551 10.5377 94.8898 10.5184 95.0695 10.5184H98.0527C98.181 10.5184 98.2773 10.5569 98.3414 10.6339C98.4184 10.6981 98.4569 10.7879 98.4569 10.9034C98.4569 11.0317 98.412 11.1472 98.3222 11.2498L95.031 15.0222L98.4184 19.0255Z"*/}
      {/*  fill={textColor}*/}
      {/*/>*/}
      {/*<path*/}
      {/*  d="M104.668 20.0456C103.59 20.0456 102.628 19.866 101.781 19.5067C100.947 19.1474 100.286 18.6085 99.7985 17.89C99.3109 17.1714 99.0671 16.2925 99.0671 15.2531C99.0671 13.6236 99.529 12.379 100.453 11.5193C101.377 10.6596 102.705 10.2297 104.437 10.2297C106.131 10.2297 107.414 10.6532 108.286 11.5C109.172 12.334 109.614 13.4953 109.614 14.9837C109.614 15.6252 109.332 15.946 108.767 15.946H102.724C102.724 16.4978 102.929 16.9212 103.34 17.2163C103.763 17.5114 104.398 17.659 105.245 17.659C105.771 17.659 106.208 17.6141 106.554 17.5243C106.913 17.4216 107.273 17.2741 107.632 17.0816C107.786 17.0174 107.889 16.9854 107.94 16.9854C108.055 16.9854 108.152 17.0623 108.229 17.2163L108.883 18.4481C108.947 18.5764 108.979 18.6727 108.979 18.7368C108.979 18.8523 108.902 18.9614 108.748 19.064C108.222 19.4105 107.626 19.6607 106.958 19.8146C106.291 19.9686 105.528 20.0456 104.668 20.0456ZM106.15 14.0406C106.15 13.553 106.009 13.1745 105.726 12.905C105.444 12.6356 105.021 12.5009 104.456 12.5009C103.892 12.5009 103.462 12.642 103.167 12.9243C102.872 13.1937 102.724 13.5658 102.724 14.0406H106.15Z"*/}
      {/*  fill={textColor}*/}
      {/*/>*/}
      {/*<path*/}
      {/*  d="M116.211 20.0456C115.133 20.0456 114.113 19.9365 113.151 19.7184C112.189 19.4874 111.412 19.1667 110.822 18.7561C110.604 18.6149 110.495 18.4674 110.495 18.3134C110.495 18.2107 110.533 18.1017 110.61 17.9862L111.553 16.4849C111.656 16.331 111.759 16.254 111.861 16.254C111.926 16.254 112.035 16.2989 112.189 16.3887C112.663 16.6582 113.202 16.8763 113.805 17.0431C114.408 17.2099 115.005 17.2933 115.595 17.2933C116.198 17.2933 116.641 17.2035 116.923 17.0238C117.218 16.8442 117.366 16.5555 117.366 16.1577C117.366 15.7728 117.206 15.4713 116.885 15.2531C116.577 15.035 115.993 14.7591 115.133 14.4255C113.837 13.9379 112.824 13.3926 112.092 12.7896C111.374 12.1737 111.015 11.3396 111.015 10.2875C111.015 9.01718 111.47 8.04843 112.381 7.38121C113.292 6.71398 114.505 6.38037 116.019 6.38037C117.071 6.38037 117.969 6.47661 118.713 6.66907C119.47 6.84871 120.112 7.131 120.638 7.51593C120.856 7.68274 120.965 7.83671 120.965 7.97786C120.965 8.06767 120.927 8.17032 120.85 8.2858L119.907 9.78705C119.791 9.94103 119.688 10.018 119.599 10.018C119.534 10.018 119.425 9.97311 119.271 9.88329C118.527 9.3957 117.642 9.15191 116.615 9.15191C116.064 9.15191 115.64 9.24173 115.345 9.42137C115.05 9.601 114.902 9.89612 114.902 10.3067C114.902 10.589 114.979 10.82 115.133 10.9996C115.287 11.1792 115.493 11.3396 115.749 11.4808C116.019 11.6091 116.429 11.7759 116.981 11.9812L117.347 12.1159C118.296 12.488 119.04 12.8473 119.579 13.1937C120.131 13.5273 120.548 13.9444 120.83 14.4448C121.113 14.9324 121.254 15.5483 121.254 16.2925C121.254 17.4344 120.824 18.3455 119.964 19.0255C119.117 19.7056 117.866 20.0456 116.211 20.0456Z"*/}
      {/*  fill={textColor}*/}
      {/*/>*/}
      {/*<path*/}
      {/*  d="M125.343 19.7569C125.151 19.7569 125.003 19.7248 124.9 19.6607C124.798 19.5965 124.721 19.4682 124.67 19.2757L122.187 10.9611C122.161 10.8841 122.148 10.8264 122.148 10.7879C122.148 10.6083 122.277 10.5184 122.533 10.5184H125.074C125.241 10.5184 125.362 10.5505 125.439 10.6147C125.516 10.666 125.568 10.7558 125.593 10.8841L126.633 15.2531L127.941 11.731C128.006 11.577 128.07 11.4744 128.134 11.423C128.211 11.3589 128.339 11.3268 128.519 11.3268H129.731C129.911 11.3268 130.033 11.3589 130.097 11.423C130.174 11.4744 130.245 11.577 130.309 11.731L131.598 15.2531L132.657 10.8841C132.695 10.7558 132.747 10.666 132.811 10.6147C132.875 10.5505 132.991 10.5184 133.157 10.5184H135.717C135.974 10.5184 136.102 10.6083 136.102 10.7879C136.102 10.8264 136.089 10.8841 136.064 10.9611L133.562 19.2757C133.51 19.4682 133.433 19.5965 133.331 19.6607C133.241 19.7248 133.1 19.7569 132.907 19.7569H131.021C130.841 19.7569 130.707 19.7248 130.617 19.6607C130.527 19.5837 130.45 19.4554 130.386 19.2757L129.116 15.7921L127.845 19.2757C127.794 19.4554 127.717 19.5837 127.614 19.6607C127.524 19.7248 127.39 19.7569 127.21 19.7569H125.343Z"*/}
      {/*  fill={textColor}*/}
      {/*/>*/}
      {/*<path*/}
      {/*  d="M140.981 20.0456C139.775 20.0456 138.806 19.6607 138.075 18.8908C137.356 18.1081 136.997 17.011 136.997 15.5996C136.997 14.5218 137.241 13.5787 137.728 12.7703C138.229 11.9619 138.928 11.3396 139.826 10.9034C140.737 10.4543 141.783 10.2297 142.963 10.2297C143.938 10.2297 144.798 10.3388 145.542 10.5569C146.299 10.7622 146.992 11.0638 147.621 11.4615V19.1602C147.621 19.404 147.576 19.5644 147.486 19.6414C147.396 19.7184 147.217 19.7569 146.947 19.7569H144.984C144.843 19.7569 144.734 19.7376 144.657 19.6992C144.58 19.6478 144.516 19.5708 144.465 19.4682L144.214 18.8908C143.842 19.2886 143.393 19.5773 142.867 19.7569C142.354 19.9494 141.725 20.0456 140.981 20.0456ZM142.424 17.428C142.925 17.428 143.316 17.3061 143.598 17.0623C143.881 16.8186 144.022 16.4721 144.022 16.023V13.0205C143.778 12.905 143.47 12.8473 143.098 12.8473C142.418 12.8473 141.873 13.0847 141.462 13.5594C141.064 14.0342 140.865 14.7014 140.865 15.5611C140.865 16.8057 141.385 17.428 142.424 17.428Z"*/}
      {/*  fill={textColor}*/}
      {/*/>*/}
      {/*<path*/}
      {/*  d="M150.28 23.6447C149.908 23.6447 149.645 23.5678 149.491 23.4138C149.35 23.2598 149.279 23.016 149.279 22.6824V11.654C149.857 11.2434 150.582 10.9034 151.454 10.6339C152.327 10.3645 153.238 10.2297 154.187 10.2297C158.062 10.2297 160 11.8721 160 15.1569C160 16.6453 159.589 17.8322 158.768 18.7176C157.947 19.6029 156.786 20.0456 155.284 20.0456C154.861 20.0456 154.45 19.9943 154.053 19.8916C153.668 19.789 153.347 19.6478 153.09 19.4682V22.6824C153.09 23.016 153.013 23.2598 152.859 23.4138C152.705 23.5678 152.442 23.6447 152.07 23.6447H150.28ZM154.457 17.4473C155.009 17.4473 155.419 17.242 155.689 16.8314C155.971 16.408 156.112 15.8434 156.112 15.1377C156.112 14.3036 155.945 13.7198 155.612 13.3862C155.291 13.0398 154.79 12.8665 154.11 12.8665C153.674 12.8665 153.328 12.9243 153.071 13.0398V16.1C153.071 16.5363 153.193 16.8699 153.437 17.1008C153.681 17.3318 154.021 17.4473 154.457 17.4473Z"*/}
      {/*  fill={textColor}*/}
      {/*/>*/}
      {/* <path */}
      {/*  fillRule="evenodd" */}
      {/*  clipRule="evenodd" */}
      {/*  d="M4.38998 4.50033C4.01476 2.49106 5.55649 0.634766 7.60049 0.634766C9.40427 0.634766 10.8665 2.09701 10.8665 3.90078V7.92728C11.3177 7.89544 11.7761 7.87911 12.2404 7.87911C12.6865 7.87911 13.1272 7.89418 13.5612 7.9236V3.90078C13.5612 2.09701 15.0234 0.634766 16.8272 0.634766C18.8712 0.634766 20.4129 2.49106 20.0377 4.50033L19.1539 9.23326C22.1872 10.5576 24.4809 12.8577 24.4809 15.748V17.4966C24.4809 19.8734 22.9085 21.8634 20.7102 23.2068C18.4948 24.5606 15.4978 25.3654 12.2404 25.3654C8.98304 25.3654 5.98604 24.5606 3.77065 23.2068C1.57242 21.8634 0 19.8734 0 17.4966V15.748C0 12.873 2.2701 10.5817 5.27785 9.25477L4.38998 4.50033ZM18.0212 9.85508L19.0555 4.3169C19.3159 2.92236 18.2459 1.63399 16.8272 1.63399C15.5753 1.63399 14.5604 2.64886 14.5604 3.90078V9.02479C14.2324 8.98273 13.8991 8.9494 13.5612 8.92524C13.128 8.89426 12.6873 8.87833 12.2404 8.87833C11.7753 8.87833 11.3168 8.89559 10.8665 8.92912C10.5286 8.95429 10.1953 8.98862 9.86729 9.03169V3.90078C9.86729 2.64886 8.85241 1.63399 7.60049 1.63399C6.18184 1.63399 5.11179 2.92235 5.37222 4.3169L6.40988 9.87345C3.16599 11.0784 0.999219 13.2586 0.999219 15.748V17.4966C0.999219 21.2906 6.03208 24.3662 12.2404 24.3662C18.4488 24.3662 23.4817 21.2906 23.4817 17.4966V15.748C23.4817 13.2458 21.2927 11.0562 18.0212 9.85508Z" */}
      {/*  fill="#633001" */}
      {/* /> */}
      {/* <path*/}
      {/*  d="M23.4815 17.4967C23.4815 21.2907 18.4486 24.3663 12.2402 24.3663C6.03189 24.3663 0.999023 21.2907 0.999023 17.4967V15.748H23.4815V17.4967Z" */}
      {/*  fill="#FEDC90" */}
      {/* /> */}
      {/* <path*/}
      {/*  fillRule="evenodd" */}
      {/*  clipRule="evenodd" */}
      {/*  d="M5.37202 4.31671C5.1116 2.92216 6.18164 1.63379 7.6003 1.63379C8.85222 1.63379 9.8671 2.64867 9.8671 3.90059V9.0315C10.6321 8.93102 11.4261 8.87813 12.2402 8.87813C13.0356 8.87813 13.8116 8.9286 14.5602 9.02459V3.90059C14.5602 2.64867 15.5751 1.63379 16.827 1.63379C18.2457 1.63379 19.3157 2.92216 19.0553 4.31671L18.021 9.85488C21.2925 11.056 23.4815 13.2457 23.4815 15.7478C23.4815 19.5418 18.4486 22.6174 12.2402 22.6174C6.03189 22.6174 0.999023 19.5418 0.999023 15.7478C0.999023 13.2584 3.16579 11.0782 6.40968 9.87326L5.37202 4.31671Z" */}
      {/*  fill="#D1884F" */}
      {/* /> */}
      {/* <path */}
      {/*  className="left-eye" */}
      {/*  d="M9.11817 15.2485C9.11817 16.2833 8.55896 17.1221 7.86914 17.1221C7.17932 17.1221 6.62012 16.2833 6.62012 15.2485C6.62012 14.2138 7.17932 13.375 7.86914 13.375C8.55896 13.375 9.11817 14.2138 9.11817 15.2485Z" */}
      {/*  fill="#633001" */}
      {/* /> */}
      {/* <path */}
      {/*  className="right-eye" */}
      {/*  d="M17.7363 15.2485C17.7363 16.2833 17.1771 17.1221 16.4873 17.1221C15.7975 17.1221 15.2383 16.2833 15.2383 15.2485C15.2383 14.2138 15.7975 13.375 16.4873 13.375C17.1771 13.375 17.7363 14.2138 17.7363 15.2485Z" */}
      {/*  fill="#633001" */}
      {/* /> */}
    </Svg>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
