import { Route } from "wouter";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Route path="/" component={Dashboard} />
      <Route path="/user/:id">
        {params => <User userId={Number(params.id)} />}
      </Route>
      <Route path="/register" component={Register}/>
    </>
  );
}

export default App;
