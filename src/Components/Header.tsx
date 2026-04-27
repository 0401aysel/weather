import type { WeatherResponse, TMenu, TMode } from "../Models/Model";
interface IProps {
  mode: TMode;
  menu: TMenu;
  city: string;
  weatherdata: WeatherResponse | null;
  onMenuClose: () => void;
  onMenuOpen: () => void;
  onSetMode: () => void;
  onCityChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function Header({
  mode,
  menu,
  city,
  weatherdata,
  onMenuClose,
  onCityChange,
  onMenuOpen,
  onSubmit,
  onSetMode,
}: IProps) {
  return (
    <>
      <div className={`menu-inner ${menu ?? ""}`}>
        <button onClick={onMenuClose}>
          <img src={`/src/assets/close${mode}.svg`} alt="mode" />
        </button>
        <ul>
          <li className="list-item">Weather</li>
          <li className="list-item">Weekly</li>
          <li className="list-item">Monthly</li>
          <li className="list-item">Azeraijan, Baku</li>
        </ul>
      </div>
      <header>
        <div className="headerFlex mode">
          <button className="menu" onClick={onMenuOpen}>
            <img src={`/src/assets/menu${mode}.svg`} alt="mode" />{" "}
            <a href="#">Weather</a>
          </button>
          <div className="currentLocation">
            <img src={`/src/assets/gps${mode}.svg`} alt="location" />
            <p>
              {weatherdata?.city.country} , {weatherdata?.city.name}
            </p>
          </div>
          <form onSubmit={onSubmit} className="searchForm">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
            />
            <button type="submit">
              <img src={`/src/assets/location${mode}.svg`} alt="search" />
            </button>
          </form>
          <button className="setMode" onClick={onSetMode}>
            <img src={`/src/assets/img${mode}.svg`} alt="mode" />
            {mode}
          </button>
        </div>
      </header>
    </>
  );
}
