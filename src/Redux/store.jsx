import { configureStore } from "@reduxjs/toolkit";
import sinhVienReducer from "./sinhVienReducer";

export const store = configureStore({
  reducer: {
    //state ứng dụng lưu tại đây
    sinhVienReducer,
    //redux trả về giá trị mới thì component mới render lại (so sánh này là shallow compare)
  },
});
