import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  useFormikContext,
} from 'formik'; import { v4 as uuidv4 } from 'uuid';
import React, { ButtonHTMLAttributes, ChangeEvent, ChangeEventHandler, EventHandler, MouseEventHandler, useEffect } from 'react';
import { useState } from 'react';
import { UserDto } from './UserDto';
import * as Yup from 'yup';
import { v4 } from "uuid";

interface UserDto2 {
  adi: string,
  soyadi: string,
  numarasi: string,
  ulkesi: string,
  id: string
}

export const MyApp: React.FC<{}> = () => {

  const [users, setUsers] = useState<UserDto[]>([])
  const [input, setInput] = useState<string>()

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

  const sil = (id: string) => {
    setUsers(users => users.filter(todo => todo.id != id))
  }
  const duzenle = (id: string) => {
    let newEditItem = users.find((users) => {
      return users.id == id
    });
    console.log(newEditItem)
  }
  
  return (
    <div>
      <Formik
        initialValues={{ adi: '', soyadi: '', numarasi: '', ulkesi: '', id: uuidv4() }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            setSubmitting(false);
            /*alert(JSON.stringify(values, null, 2));*/
            resetForm({ values: { adi: '', soyadi: '', numarasi: '', ulkesi: '', id: uuidv4() } });
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
              id='ADI'
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
              Ekle
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
              <td><button onClick={() => sil(todo.id)}>Sil</button><button onClick={() => duzenle(todo.id)}>Düzenle</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyApp;

function setEditTodoIdx(nBeingEdited: number) {
  throw new Error('Function not implemented.');
}
