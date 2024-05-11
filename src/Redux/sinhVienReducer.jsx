import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrSinhVien: [],
};

const sinhVienReducer = createSlice({
  name: "sinhVienReducer", //tạo ra tên action {type: 'sinhVienReducer/themSinhVien'}
  initialState,
  reducers: {
    themSinhVienAction: (state, action) => {
      state.arrSinhVien.push(action.payload);
    },
    suaSinhVienAction: (state, action) => {
      const svEdit = action.payload;
      const existingSV = state.arrSinhVien.find(
        (a) => a.maSinhVien === svEdit.maSinhVien
      );
      if (existingSV) {
        existingSV.tenSinhVien = svEdit.tenSinhVien;
        existingSV.email = svEdit.email;
        existingSV.soDienThoai = svEdit.soDienThoai;
      }
    },
    xoaSinhVienAction: (state, action) => {
      const idxSV = state.arrSinhVien.findIndex(
        (a) => a.maSinhVien == action.payload
      );
      if (idxSV != -1) {
        state.arrSinhVien.splice(idxSV, 1);
      }
    },
  },
});

export const { themSinhVienAction, suaSinhVienAction, xoaSinhVienAction } =
  sinhVienReducer.actions;

export default sinhVienReducer.reducer;
