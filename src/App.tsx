import React, { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import AppRouter from "./router";

export default function App(): ReactElement {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AppRouter />
    </QueryClientProvider>
  );
}
