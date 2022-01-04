import React from "react";

import Navigation from "./routes/Navigation";
import ErrorContainer from "./components/ErrorContainer";
import { AuthProvider } from "./services/context/AuthContext";
import { ErrorProvider } from "./services/context/ErrorContext";
import { AxiosProvider } from "./services/context/AxiosContext";

export default function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <AxiosProvider>
          <Navigation />
          <ErrorContainer />
        </AxiosProvider>
      </AuthProvider>
    </ErrorProvider>
  );
}
