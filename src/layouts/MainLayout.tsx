import { Link, Outlet } from "react-router-dom";
import "./MainLayout.scss";

export const MainLayout = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar__header">
          <span>
            <em>Dev</em>Karriere.de
          </span>
        </div>
        <ul className="sidebar__nav">
          <li>
            <Link to="/">Übersicht</Link>
          </li>
          <li>
            <Link to="/create">Erstellen</Link>
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};
