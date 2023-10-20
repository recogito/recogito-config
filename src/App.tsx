import "./App.css";
import Main from "./components/Main";
import { FlexColumn } from "./components/layouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigToolProvider } from "./providers/ConfigToolProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <FlexColumn fullWidth>
      <QueryClientProvider client={queryClient}>
        <ConfigToolProvider>
          <Main />
        </ConfigToolProvider>
      </QueryClientProvider>
    </FlexColumn>
  );
}

export default App;
