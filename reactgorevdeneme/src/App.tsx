import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  useFormikContext,
} from 'formik';
import { useState } from 'react';
import { UserDto } from './UserDto';
import * as Yup from 'yup';
import { v4 } from "uuid";
import { useAppSelector, useAppDispatch } from './store/index';

export const MyApp: React.FC<{}> = () => {

  const [users, setUsers] = useState<UserDto[]>([])

  const Uyarilar = Yup.object().shape({
    adi: Yup.string()
      .required('Bu Alan Boş Bırakılamaz !'),
    soyadi: Yup.string()
      .required('Bu Alan Boş Bırakılamaz'),
    numarasi: Yup.string()
      .min(11, 'Numara 11 Haneli Olmalıdır !')
      .max(11, 'Numara 11 Haneli Olmalıdır !')
      .required('Bu Alan Boş Bırakılamaz !'),
    ulkesi: Yup.string()
    .required('Bu Alan Boş Bırakılamaz !')
  });
  
  return (
    <div>
      <Formik
        initialValues={{ adi: '', soyadi: '', numarasi: '', ulkesi: '', id: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            setSubmitting(false);
            /*alert(JSON.stringify(values, null, 2));*/
            console.log(values);
            resetForm();
          }, 500);
          return setUsers((users: UserDto[]) => [...users, values])
        }}
        validationSchema={Uyarilar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="adi"
              onChange={(e) => handleChange("adi")(e.target.value)}
              onBlur={handleBlur}
              placeholder="Adı"
              value={values.adi}
            />
            {errors.adi && touched.adi && errors.adi}
            <input
              type="text"
              name="soyadi"
              onBlur={handleBlur}
              placeholder="Soyadı"
              onChange={(e) => handleChange("soyadi")(e.target.value)}
              value={values.soyadi}
            />
            {errors.soyadi && touched.soyadi && errors.soyadi}
            <input
              type="text"
              name="numarasi"
              onChange={(e) => handleChange("numarasi")(e.target.value)}
              onBlur={handleBlur}
              placeholder="Numarası"
              value={values.numarasi}
            />
            {errors.numarasi && touched.numarasi && errors.numarasi}
            <input
              type="text"
              name="ulkesi"
              onChange={(e) => handleChange("ulkesi")(e.target.value)}
              onBlur={handleBlur}
              placeholder="Ülkesi"
              value={values.ulkesi}
            />
            {errors.ulkesi && touched.ulkesi && errors.ulkesi}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      <table>
        <thead>
          <tr>
            <th>Adı</th>
            <th>Soyadı</th>
            <th>Numarası</th>
            <th>Ülkesi</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((todo) =>
            <tr key={todo.id}>
              <td>{todo.adi}</td>
              <td>{todo.soyadi}</td>
              <td>{todo.numarasi}</td>
              <td>{todo.ulkesi}</td>
              <td><button>Sil</button><button>Düzenle</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyApp;