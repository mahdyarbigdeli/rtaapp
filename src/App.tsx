import "@/assets/css/global/global.scss";
import "@/assets/css/colors/colors.scss";
import { ToastContainer } from "react-toastify";

import { QueryClient, QueryClientProvider } from "react-query";
import ReduxProvider from "./@redux/reduxProvider";
import RouterIndex from "./components/Router/RouterIndex";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App() {
  return (
    <div className='App'>
      <ReduxProvider>
        <QueryClientProvider client={queryClient}>
          <RouterIndex />
          <ToastContainer autoClose={2000} />
        </QueryClientProvider>
      </ReduxProvider>
    </div>
  );
}
