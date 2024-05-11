import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { xoaSinhVienAction } from "../Redux/sinhVienReducer";
import { useNavigate } from "react-router-dom";

const TableListSinhVien = () => {
  const { arrSinhVien } = useSelector((state) => state.sinhVienReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteSinhVien = (id) => {
    const action = xoaSinhVienAction(id);
    //dispatch lên reducer
    dispatch(action);
  };

  return (
    <div className="container">
      <h3 className="pt-3">Danh sách sinh viên</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Mã sinh viên</th>
            <th>Tên sinh viên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {arrSinhVien.map((sv, index) => {
            return (
              <tr key={index}>
                <td>{sv.maSinhVien}</td>
                <td>{sv.tenSinhVien}</td>
                <td>{sv.email}</td>
                <td>{sv.soDienThoai}</td>
                <td>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => {
                      deleteSinhVien(sv.maSinhVien);
                    }}
                  >
                    Xoá
                  </button>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => {
                      navigate(`/form-sinh-vien/${sv.maSinhVien}`);
                    }}
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableListSinhVien;
