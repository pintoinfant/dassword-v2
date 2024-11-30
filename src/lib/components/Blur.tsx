import { Icon, IconProps, useBreakpointValue } from "@chakra-ui/react";

const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "80%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1 })}
      height={useBreakpointValue({ base: "360px", md: "560px" })}
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="244" cy="106" r="139" fill="#3B89CA" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#000" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#0D1E2D" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#2" />
      <circle cx="71" cy="61" r="111" fill="#4299E1" />
      <circle cy="291" r="139" fill="#347AB4" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#214C70" />
    </Icon>
  );
};

export default Blur;
