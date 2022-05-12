import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Yup from 'yup';
import { Cancelar, Form, FormSolicitarProductoContainer,
        Label, OpcionesAcabado, SpanError } from './styles';
import { Button } from 'app/shared/components/Button';
import { FormikHelpers } from 'formik/dist/types';
import { Producto } from 'app/feature/Producto/models/Producto';
import { ProductoSolicitado } from 'app/feature/Producto/models/ProductoSolicitado';
import { Select } from 'app/shared/components/Select';
import { SelectorCantidad } from './../SelectorCantidad';
import { useFormik } from 'formik';

interface FormSolicitarProductoProps {
  producto: Producto;
  onSubmit: (payload: ProductoSolicitado) => void;
  cerrarFormulario: () => void;
  initialValues?: FormValues;
}

interface FormValues {
  material: string;
  color: string;
  pulido: boolean;
  pintado: boolean;
  barnizado: boolean;
  urgencia: boolean;
  cantidad: number;
}

const validationSchema = Yup.object().shape<FormValues>({
  material: Yup.string().required('El campo material es requerido.'),
  color: Yup.string().required('El campo color es requerido.'),
  pulido: Yup.boolean().required('El campo pulido es requerido.'),
  pintado: Yup.boolean().required('El campo pintado es requerido.'),
  barnizado: Yup.boolean().required('El campo barnizado es requerido.'),
  urgencia: Yup.boolean().required('El campo urgencia es requerido.'),
  cantidad: Yup.number().required('El campo cantidad es requerido.'),
});

export const FormSolicitarProducto: React.FC<FormSolicitarProductoProps> = ({
  producto,
  onSubmit,
  cerrarFormulario,
  initialValues = {
    material: '',
    color: '',
    pulido: false,
    pintado: false,
    barnizado: false,
    urgencia: false,
    cantidad: 1,
  }
}) => {
  const [checkboxValues, setCheckboxValues] = React.useState({
    pulido: false,
    pintado: false,
    barnizado: false,
    urgencia: false
  });

  const [cantidad, setCantidad] = React.useState(1);

  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    onSubmit({
      id: 0,
      material: values.material,
      color: values.color,
      acabado: {
        pulido: checkboxValues.pulido,
        pintado: checkboxValues.pintado,
        barnizado: checkboxValues.barnizado
      },
      urgencia: checkboxValues.urgencia,
      producto: producto.id,
      cantidad
    });
    resetForm();
    cerrarFormulario();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleCancelar = () => cerrarFormulario();

  const handleFormCheckbox =(e: React.ChangeEvent<HTMLInputElement>) => {    
    const { checked, value } = e.target;

    setCheckboxValues({
      ...checkboxValues,
      [value]: checked
    });
  };

  return (
    <FormSolicitarProductoContainer>
      <Cancelar onClick={handleCancelar}>❌</Cancelar>
      <Form onSubmit={formik.handleSubmit}>
        <h2>Personalizar {producto.nombre}</h2>
        <Select name="material" placeholder="material" value={formik.values.material} onChange={formik.handleChange}>
            <option value="" >Material</option>
            <option value="PLA" >PLA</option>
            <option value="ABS" >ABS</option>
        </Select>
        {formik.touched.material && formik.errors.material && (<SpanError>{formik.errors.material}</SpanError>)}
        <Select name="color" placeholder="color" value={formik.values.color} onChange={formik.handleChange}>
          <option value="" >Color</option>
          <option value="negro" >Negro</option>
          <option value="blanco" >Blanco</option>
          <option value="negro mate" >Negro mate</option>
          <option value="madera" >Madera</option>
          <option value="plata" >Plata</option>
        </Select>
        {formik.touched.color && formik.errors.color && (<SpanError>{formik.errors.color}</SpanError>)}
        <OpcionesAcabado>
          Acabados:
          <Label>
            Pulido <input type='checkbox' name='acabado' value='pulido' onChange={handleFormCheckbox} />
          </Label>
          <Label>
            Pintado <input type='checkbox' name='acabado' value='pintado' onChange={handleFormCheckbox} />
          </Label>
          <Label>
            Barnizado <input type='checkbox' name='acabado' value='barnizado' onChange={handleFormCheckbox} />
          </Label>
        </OpcionesAcabado>
        <Label>
          Urgencia: <input type='checkbox' name='acabado' value='urgencia' onChange={handleFormCheckbox} />
        </Label>
        <SelectorCantidad setCantidad={setCantidad} cantidad={initialValues.cantidad} />             
        <Button type="submit">Agregar al carrito</Button>
      </Form>     
    </FormSolicitarProductoContainer>
  );
};

FormSolicitarProducto.propTypes = {
  producto: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cerrarFormulario: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    material: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    pulido: PropTypes.bool.isRequired,
    pintado: PropTypes.bool.isRequired,
    barnizado: PropTypes.bool.isRequired,
    urgencia: PropTypes.bool.isRequired,
    cantidad: PropTypes.number.isRequired,
  }),
};
