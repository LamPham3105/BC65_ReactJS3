import ReactDOM from "react-dom/client";

//Thư viện react router dom giúp chia các component thành page
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Setup redux
import { store } from "./Redux/store";
import { Provider } from "react-redux";

import HomeTemplate from "./Templates/HomeTemplate";
import TableListSinhVien from "./QuanLySV/TableListSinhVien";
import FormSinhVien from "./QuanLySV/FormSinhVien";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route
            path="table-list-sinh-vien"
            element={<TableListSinhVien />}
          ></Route>
          <Route path="form-sinh-vien" element={<FormSinhVien />}></Route>
          <Route path="form-sinh-vien">
            <Route path=":id" element={<FormSinhVien />}></Route>
          </Route>
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
