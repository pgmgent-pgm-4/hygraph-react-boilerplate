import { Outlet } from 'react-router-dom'; 

const AuthLayout = ({
  children,
  ...rest
}) => {
  return (
    <>
      <main>
        <Outlet/>
      </main>
    </>  
  );
};

export default AuthLayout;