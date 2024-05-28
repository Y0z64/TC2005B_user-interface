import { Route } from "wouter";
import "./index.css";
import ShowUsers from "./pages/ShowUsers";
import Home from "./pages/Home";
import User from "./pages/User";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/showUsers" component={ShowUsers} />
      <Route path="/user/:id">
        {params => <User userId={Number(params.id)} />}
      </Route>
      <Route path="/register" component={Register}/>
    </>
  );
}

export default App;
