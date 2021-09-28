import MenuManag from "./components/manager/MenuManag";
import Statistics from "./components/manager/Statistics";

// separate header and body to components

export default function Manager(newMessage) {
  return (
    <main className="container">
      <div className="card min-vh-100">
        <div className="card-header">
          <ul
            className="nav nav-pills card-header-pills flex-column flex-sm-row"
            id="header-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="header-tab-1-tab"
                data-bs-toggle="pill"
                href="#header-tab-1"
                role="tab"
                aria-controls="header-tab-1"
                aria-selected="true"
              >
                <span className="material-icons align-middle">equalizer</span>
                מידע
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="header-tab-2-tab"
                data-bs-toggle="pill"
                href="#header-tab-2"
                role="tab"
                aria-controls="header-tab-2"
                aria-selected="true"
              >
                <span className="material-icons align-middle">widgets</span>
                ניהול תפריט
              </a>
            </li>
          </ul>
        </div>

        <div className="card-body">
          <div className="tab-content" id="header-tab-tabContent">
            <div
              className="tab-pane show active fade"
              id="header-tab-1"
              role="tabpanel"
              aria-labelledby="header-tab-1-tab"
            >
              <Statistics />
            </div>
            <div
              className="tab-pane fade"
              id="header-tab-2"
              role="tabpanel"
              aria-labelledby="header-tab-2-tab"
            >
              <MenuManag newMessage={newMessage} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
