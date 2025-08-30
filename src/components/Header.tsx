export default function Header() {
  return (
    <header className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold text-redPrimary">FordFind</h1>
      <ul className="nav navbar-nav">
        <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                English(US)
                <b className="caret"></b>
              </a>
              <ul className="dropdown-menu">
                <li><a href="#">Deutsch</a></li>
                <li><a href="#">English(UK)</a></li>
                <li><a href="#">Français</a></li>
              </ul>
        </li>
      </ul>
    </header>
  );
}
