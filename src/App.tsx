import { Route } from "wouter";
import "./index.css";
import ShowUsers from "./pages/ShowUsers";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/showUsers" component={ShowUsers} />
    </>
  );
}

export default App;
