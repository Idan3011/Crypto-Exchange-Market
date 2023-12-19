import { Link } from "react-router-dom";

export default function Header({ back }) {
  return (
    <header className="header">
      <div className="width">
        <h1>
          <Link to="/">Crypto Tracker</Link>
        </h1>
      </div>
    </header>
  );
}