import { Route } from "wouter";
import "./index.css";
import ShowUsers from "./pages/ShowUsers";
import Home from "./pages/Home";
import UserInfo from "./pages/UserInfo";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/showUsers" component={ShowUsers} />
      <Route path="/user/:id">
        {params => <UserInfo userId={Number(params.id)} />}
      </Route>
      <Route path="/register" component={Register}/>
    </>
  );
}

export default App;
