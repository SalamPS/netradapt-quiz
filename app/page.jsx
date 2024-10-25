import Login from "./components/Login";
import "./css/login.css";

export default function Home() {
  return (
  <div id="login">
    <div className="container">
      <h1 className="title">Audio Vista</h1>
      <Login/>
    </div>
  </div>);
}
