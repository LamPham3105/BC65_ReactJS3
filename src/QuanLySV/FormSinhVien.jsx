import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  themSinhVienAction,
  suaSinhVienAction,
} from "../Redux/sinhVienReducer";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const numberRegExp = /^[0-9]+$/;

const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const wordRegExp =
  /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/;

const FormSinhVien = () => {
  //useParam => Lấy param trên url
  const params = useParams();
  const { arrSinhVien } = useSelector((state) => state.sinhVienReducer);

  const editPage = params?.id != undefined;

  const sv = arrSinhVien.find((a) => a.maSinhVien == params?.id);

  const [text, setText] = useState();
  const [inforSV, setinforSV] = useState(sv);

  const navigate = useNavigate();

  const getSV = () => {
    const sv = arrSinhVien.find((a) => a.maSinhVien == params?.id);

    if (sv != "") {
      setinforSV(sv);
    }
  };

  const getTextForm = async () => {
    if (params?.id) {
      setText("Chỉnh sửa thông tin sinh viên");
    } else {
      setText("Thêm thông tin sinh viên");
    }
  };

  useEffect(() => {
    getTextForm();
    getSV();
  }, []);

  const dispatch = useDispatch();
  const frmSV = useFormik({
    initialValues: {
      maSinhVien: editPage ? inforSV.maSinhVien : "",
      tenSinhVien: editPage ? inforSV.tenSinhVien : "",
      email: editPage ? inforSV.email : "",
      soDienThoai: editPage ? inforSV.soDienThoai : "",
    },
    validationSchema: Yup.object({
      maSinhVien: Yup.string()
        .matches(numberRegExp, "Mã sinh viên chỉ có thể là số")
        .min(1, "Mã sinh viên phải có ít nhất một chữ số")
        .test("validator-only", function (id) {
          const idxSV = arrSinhVien.findIndex(
            (a) => a.maSinhVien == Number(id)
          );

          if (idxSV != -1 && !editPage) {
            return this.createError({
              path: this.path,
              message: "Mã sinh viên đã tồn tại",
            });
          } else {
            return true;
          }
        })
        .required("Vui lòng nhập mã sinh viên!"),
      tenSinhVien: Yup.string()
        .matches(wordRegExp, "Tên sinh viên chỉ có thể là chữ")
        .required("Vui lòng nhập tên sinh viên!"),
      email: Yup.string()
        .matches(emailRegExp, "Email không đúng định dạng")
        .required("Vui lòng nhập email!"),
      soDienThoai: Yup.string()
        .matches(numberRegExp, "Mã sinh viên chỉ có thể là số")
        .matches(phoneRegExp, "Số điện thoại không hợp lệ")
        .required("Vui lòng nhập số điện thoại!"),
    }),
    onSubmit: (sinhVien, { resetForm }) => {
      let action;
      if (!editPage) {
        action = themSinhVienAction(sinhVien);
      } else {
        action = suaSinhVienAction(sinhVien);
      }

      //dispatch lên reducer
      dispatch(action);

      resetForm();
      navigate("/table-list-sinh-vien");
    },
  });

  return (
    <div className="container">
      <form className="w-50 mx-auto" onSubmit={frmSV.handleSubmit}>
        <h3 className="pt-3">{text}</h3>
        <div className="form-group">
          <p>Mã sinh viên</p>
          <input
            className="form-control"
            name="maSinhVien"
            value={frmSV.values.maSinhVien}
            onInput={frmSV.handleChange}
            readOnly={editPage}
          />
          {frmSV.errors.maSinhVien && frmSV.touched.maSinhVien && (
            <p style={{ color: "red" }}>{frmSV.errors.maSinhVien}</p>
          )}
        </div>
        <div className="form-group">
          <p>Tên sinh viên</p>
          <input
            className="form-control"
            name="tenSinhVien"
            value={frmSV.values.tenSinhVien}
            onInput={frmSV.handleChange}
          />
          {frmSV.errors.tenSinhVien && frmSV.touched.tenSinhVien && (
            <p style={{ color: "red" }}>{frmSV.errors.tenSinhVien}</p>
          )}
        </div>
        <div className="form-group">
          <p>Email</p>
          <input
            className="form-control"
            name="email"
            value={frmSV.values.email}
            onInput={frmSV.handleChange}
          />
          {frmSV.errors.email && frmSV.touched.email && (
            <p style={{ color: "red" }}>{frmSV.errors.email}</p>
          )}
        </div>
        <div className="form-group">
          <p>Số điện thoại</p>
          <input
            className="form-control"
            name="soDienThoai"
            value={frmSV.values.soDienThoai}
            onInput={frmSV.handleChange}
          />
          {frmSV.errors.soDienThoai && frmSV.touched.soDienThoai && (
            <p style={{ color: "red" }}>{frmSV.errors.soDienThoai}</p>
          )}
        </div>
        <div className="form-group mt-2">
          <button type="submit" className="btn btn-dark">
            {text}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSinhVien;
