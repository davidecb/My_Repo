import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Yup from 'yup';
import {
  Cancelar,
  Form,
  FormSolicitarPedidoContainer,
  SpanError
} from './styles';
import { BtnFinalizarPedido } from '../BtnFinalizarPedido';
import { FormikHelpers } from 'formik/dist/types';
import { Input } from 'app/shared/components/Input';
import { Pedido } from '../../models/Pedido';
import { useFormik } from 'formik';

interface FormSolicitarPedidoProps {
  pedido: Pedido;
  onSubmit: (payload: Pedido) => void;
  cerrarFormulario: () => void;
  initialValues?: FormValues;
}

interface FormValues {
  direccion: string;
  cliente: string;
}

const validationSchema = Yup.object().shape<FormValues>({
  direccion: Yup.string().required('El campo direccion es requerido.'),
  cliente: Yup.string().required('El campo cliente es requerido.'),
});

export const FormSolicitarPedido: React.FC<FormSolicitarPedidoProps> = ({
  pedido,
  onSubmit,
  cerrarFormulario,
  initialValues = {
    direccion: '',
    cliente: '',
  }
}) => {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    onSubmit({
      id: pedido.id,
      numeroPedido: pedido.numeroPedido,
      direccion: values.direccion,
      cliente: values.cliente,
      estado: 'solicitado',
      costo: pedido.costo,
      tiempo: pedido.tiempo,
      productosSolicitados: [],
    });
    resetForm();
    cerrarFormulario();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleCancelar = () => {
    cerrarFormulario();
  };

  return (
    <FormSolicitarPedidoContainer>      
      <Cancelar onClick={handleCancelar}>❌</Cancelar>
      <Form onSubmit={formik.handleSubmit}>
        <h2>Solicitar Pedido</h2>
        <Input
          name="direccion"
          placeholder="direccion"
          value={formik.values.direccion}
          onChange={formik.handleChange}
        />
        {formik.touched.direccion && formik.errors.direccion && (
          <SpanError>{formik.errors.direccion}</SpanError>
        )}
        <Input
          name="cliente"
          placeholder="cliente"
          value={formik.values.cliente}
          onChange={formik.handleChange}
        />
        {formik.touched.cliente && formik.errors.cliente && (
          <SpanError>{formik.errors.cliente}</SpanError>
        )}             
        <BtnFinalizarPedido pedido={pedido} onSolicitar={() => {}} />
      </Form>     
    </FormSolicitarPedidoContainer>
  );
};

FormSolicitarPedido.propTypes = {
  pedido: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cerrarFormulario: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    direccion: PropTypes.string.isRequired,
    cliente: PropTypes.string.isRequired,
  }),
};
