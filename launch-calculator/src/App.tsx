import { Switch, Route, Router as WouterRouter } from "wouter";
import Calculator from "@/pages/Calculator";
import Admin from "@/pages/Admin";

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
        <Route path="/" component={Calculator} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </WouterRouter>
  );
}

export default App;
