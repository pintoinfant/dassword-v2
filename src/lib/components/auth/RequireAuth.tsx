import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const RequireAuth = ({ children, redirectTo = "/" }: PrivateRouteProps) => {
  // add your own authentication logic here
  const { isConnected, address } = useAccount();

  return (address || isConnected) ? (
    (children as React.ReactElement)
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default RequireAuth;
