import React, { Component, Suspense } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Form,
  Container
} from "reactstrap";
import API_CCS from "../services/API_CCS";
import AuthService from "../services/AuthService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "react-loader-spinner";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import Select from "react-select";
import * as router from "react-router-dom";
import routes from "../routes";
import { AppHeader, AppBreadcrumb2 as AppBreadcrumb } from "@coreui/react";


const DefaultHeader = React.lazy(() =>
  import("../containers/DefaultLayout/LoggedOutHeader")
);

const brandColor = "#fc4669";

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: "1px solid #e4e7ea",
    borderRadius: "0.25rem",
    fontSize: "0.875rem",
    boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(192, 3, 39, 0.25)" : 0,
    borderColor: state.isFocused ? brandColor : base.borderColor,
    "&:hover": {
      borderColor: state.isFocused ? brandColor : base.borderColor
    },
    "&:active": {
      borderColor: state.isFocused ? brandColor : base.borderColor
    }
  })
};

const theme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "rgba(192,3,39,.2)",
    primary50: "rgba(192,3,39,.2)",
    primary75: "rgba(192,3,39,.2)",
    primary: "rgba(192,3,39,.8)"
  }
});

const estados = [
  { value: "Aguascalientes", label: "Aguascalientes" },
  { value: "Baja California", label: "Baja California" },
  { value: "Baja California Sur", label: "Baja California Sur" },
  { value: "Campeche", label: "Campeche" },
  { value: "Chiapas", label: "Chiapas" },
  { value: "Chihuahua", label: "Chihuahua" },
  { value: "Coahuila de Zaragoza", label: "Coahuila de Zaragoza" },
  { value: "Colima", label: "Colima" },
  { value: "Distrito Federal", label: "Distrito Federal" },
  { value: "Durango", label: "Durango" },
  { value: "Guanajuato", label: "Guanajuato" },
  { value: "Guerrero", label: "Guerrero" },
  { value: "Hidalgo", label: "Hidalgo" },
  { value: "Jalisco", label: "Jalisco" },
  { value: "México", label: "México" },
  { value: "Michoacán de Ocampo", label: "Michoacán de Ocampo" },
  { value: "Morelos", label: "Morelos" },
  { value: "Nayarit", label: "Nayarit" },
  { value: "Nuevo León", label: "Nuevo León" },
  { value: "Oaxaca", label: "Oaxaca" },
  { value: "Puebla", label: "Puebla" },
  { value: "Querétaro", label: "Querétaro" },
  { value: "Quintana Roo", label: "Quintana Roo" },
  { value: "San Luis Potosí", label: "San Luis Potosí" },
  { value: "Sinaloa", label: "Sinaloa" },
  { value: "Sonora", label: "Sonora" },
  { value: "Tabasco", label: "Tabasco" },
  { value: "Tamaulipas", label: "Tamaulipas" },
  { value: "Tlaxcala", label: "Tlaxcala" },
  {
    value: "Veracruz de Ignacio de la Llave",
    label: "Veracruz de Ignacio de la Llave"
  },
  { value: "Yucatán", label: "Yucatán" },
  { value: "Zacatecas", label: "Zacatecas" }
];

const brandPrimary = getStyle("--primary");

const MySwal = withReactContent(Swal);

class Llamada_General extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.API_CCS = new API_CCS();
    this.Auth = new AuthService();
    this.formRef = React.createRef();
    this.state = {
      isSaving: false,
      estado: "",
      municipio: "",
      municipios: [],
      colonia: "",
      colonias: [],
      cp: "",
      calle: "",
      comentarios: "",
      edo_civil: "",
      email_1: "",
      email_2: "",
      entrecalles: "",
      ext_1: "",
      ext_2: "",
      exterior: "",
      fecha_nacimiento: "",
      interior: "",
      materno: "",
      nombres: "",
      paterno: "",
      sexo: "",
      tel_1: "",
      tel_2: "",
      tip_1: "",
      tipo_vial: "",
      id_user: this.Auth.getProfile().id_ccs
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleChangeCP = async e => {
    this.setState({ cp: e.target.value });

    if (e.target.value.length === 5) {
      try {
        var datos = await this.API_CCS.getCP(e.target.value);

        this.setState(
          { estado: datos[0][0].Estado },
          this.setState(
            {
              municipios: await this.API_CCS.getMunicipios(datos[0][0].Estado)
            },

            this.setState(
              {
                municipio: datos[0][0].Municipio,
                colonias: await this.API_CCS.getColonias(
                  datos[0][0].Estado,
                  datos[0][0].Municipio
                )
              },
              () => {
                if (datos[0][0].Colonias.length > 1) {
                } else {
                  this.setState({
                    colonia: datos[0][0].Colonias[0]
                  });
                }
              }
            )
          )
        );
      } catch (err) {
        MySwal.fire(
          {
            title: "Error",
            text: "¡El código postal no existe!",
            allowOutsideClick: true,
            type: "error",
            confirmButtonColor: "#C00327",
            confirmButtonText: "Ok"
          },
          this.setState({
            cp: "",
            estado: "",
            municipio: "",
            colonia: "",
            municipios: [],
            colonias: []
          })
        );
      }
    } else {
      this.setState({
        estado: "",
        municipio: "",
        colonia: "",
        municipios: [],
        colonias: []
      });
    }
  };

  handleChangeEstado = e => {
    try {
      this.setState({ estado: e.label }, async () => {
        this.setState({
          municipios: await this.API_CCS.getMunicipios(this.state.estado)
        });
      });
    } catch (err) {
      this.setState({ estado: "" }, () => {
        this.setState({
          municipios: [],
          municipio: "",
          colonia: "",
          colonias: [],
          cp: ""
        });
      });
    }
  };

  handleChangeMunicipio = e => {
    try {
      this.setState({ municipio: e.label }, async () => {
        this.setState({
          colonias: await this.API_CCS.getColonias(
            this.state.estado,
            this.state.municipio
          )
        });
      });
    } catch (err) {
      this.setState(
        { municipio: "", colonia: "", colonias: [], cp: "" },
        () => {}
      );
    }
  };

  handleChangeColonia = e => {
    try {
      this.setState({ colonia: e.label, cp: e.value }, async () => {});
    } catch (err) {
      this.setState({ colonia: "", cp: "" }, () => {});
    }
  };

  handleFormSubmit(e) {
    e.preventDefault();

    this.setState({ isSaving: true });

    this.API_CCS.insertGeneral(this.state)
      .then(res => {
        MySwal.fire({
          title: "¡Correcto!",
          html: "¡Se levanto el guardo el registro correctamente!",
          type: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#C00327",
          allowOutsideClick: false
        });
        this.setState({ isSaving: false });
        this.props.history.replace("/Inicio");
      })
      .catch(err => {
        MySwal.fire({
          title: "Error",
          text:
            "Ocurrio un error al guardar el registro, por favor intenta de nuevo",
          type: "error",
          confirmButtonColor: "#C00327",
          allowOutsideClick: true
        });
      });

    this.setState({ isSaving: false });
  }

  render() {
    if (this.state.isSaving) {
      return (
        <div
          style={{
            height: "340px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div>
            <Loader type="Oval" color={brandPrimary} height="70" width="70" />{" "}
          </div>
        </div>
      );
    } else {
      return (
        <div className="animated fadeIn">
          <AppHeader fixed>
            <DefaultHeader />
          </AppHeader>

          <main className="main">
   
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Card>
                  <CardHeader className="text-center">
                    Datos Generales
                  </CardHeader>

                  <CardBody>
                    <Form
                      className="form-horizontal"
                      onSubmit={this.handleFormSubmit}
                      innerRef={this.formRef}
                      autoComplete="off"
                    >
                      <Row>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Nombres</Label>
                            <Input
                              type="text"
                              placeholder="Nombres"
                              required
                              onChange={this.handleChange}
                              id="nombres"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Paterno</Label>
                            <Input
                              type="text"
                              placeholder="Apellido Paterno"
                              required
                              onChange={this.handleChange}
                              id="paterno"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Materno</Label>
                            <Input
                              type="text"
                              placeholder="Apellido Materno"
                              onChange={this.handleChange}
                              id="materno"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Sexo</Label>
                            <Input
                              type="select"
                              placeholder="Categoría"
                              required
                              onChange={this.handleChange}
                              id="sexo"
                            >
                              <option value="">-Selecciona-</option>
                              <option>Masculino</option>
                              <option>Femenino</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">
                              Fecha de Nacimiento
                            </Label>
                            <Input
                              type="date"
                              date-format="dd/mm/yyyy"
                              placeholder="Fecha Nacimiento"
                              onChange={this.handleChange}
                              id="fecha_nacimiento"
                              lang="es"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Estado Civil</Label>
                            <Input
                              type="select"
                              placeholder="Categoría"
                              onChange={this.handleChange}
                              id="edo_civil"
                            >
                              <option value="">-Selecciona-</option>
                              <option>Casado</option>
                              <option>Divorciado</option>
                              <option>Soltero</option>
                              <option>Union Libre</option>
                              <option>Viudo</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="col-sm-2">
                          <FormGroup>
                            <Label htmlFor="prospecto">Tipo Vial</Label>
                            <Input
                              type="select"
                              placeholder="Categoría"
                              onChange={this.handleChange}
                              id="tipo_vial"
                            >
                              <option value="">-Selecciona-</option>
                              <option>Andador</option>
                              <option>Autopista</option>
                              <option>Avenida</option>
                              <option>Boulevard</option>
                              <option>Calle</option>
                              <option>Callejón</option>
                              <option>Calzada</option>
                              <option>Camino</option>
                              <option>Carretera</option>
                              <option>Cerrada</option>
                              <option>Circuito</option>
                              <option>Circunvalación</option>
                              <option>Diagonal</option>
                              <option>Eje</option>
                              <option>Libramiento</option>
                              <option>Parque</option>
                              <option>Pasaje</option>
                              <option>Paseo</option>
                              <option>Periferico</option>
                              <option>Plaza</option>
                              <option>Privada</option>
                              <option>Prolongación</option>
                              <option>Retorno</option>
                              <option>Viaducto</option>
                              <option>Rinconada</option>
                              <option>Via</option>
                            </Input>
                          </FormGroup>
                        </Col>

                        <Col className="col-sm-6">
                          <FormGroup>
                            <Label htmlFor="prospecto">Calle</Label>
                            <Input
                              type="text"
                              placeholder="Calle"
                              onChange={this.handleChange}
                              id="calle"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-1">
                          <FormGroup>
                            <Label htmlFor="prospecto">Exterior</Label>
                            <Input
                              type="text"
                              placeholder="Ext."
                              onChange={this.handleChange}
                              id="exterior"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-1">
                          <FormGroup>
                            <Label htmlFor="prospecto">Interior</Label>
                            <Input
                              type="text"
                              placeholder="Int."
                              onChange={this.handleChange}
                              id="interior"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="col-sm-12">
                          <FormGroup>
                            <Label htmlFor="prospecto">Entre Calles</Label>
                            <Input
                              type="text"
                              placeholder="Entrecalles"
                              onChange={this.handleChange}
                              id="entrecalles"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="col-sm-2">
                          <FormGroup>
                            <Label htmlFor="prospecto">Código Postal</Label>
                            <Input
                              type="number"
                              pattern="[0-9]{10}"
                              placeholder="CP"
                              onChange={this.handleChangeCP}
                              value={this.state.cp}
                              id="cp"
                              maxLength="5"
                            ></Input>
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-3">
                          <FormGroup>
                            <Label htmlFor="prospecto">Colonia</Label>
                            <Select
                              options={this.state.colonias}
                              styles={customStyles}
                              isClearable={true}
                              placeholder={"-Selecciona-"}
                              theme={theme}
                              onChange={this.handleChangeColonia}
                              value={
                                this.state.colonia === ""
                                  ? null
                                  : {
                                      label: this.state.colonia,
                                      value: this.state.colonia
                                    }
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-3">
                          <FormGroup>
                            <Label htmlFor="prospecto">
                              Delegación/Municipio
                            </Label>
                            <Select
                              options={this.state.municipios}
                              styles={customStyles}
                              isClearable={true}
                              placeholder={"-Selecciona-"}
                              theme={theme}
                              onChange={this.handleChangeMunicipio}
                              value={
                                this.state.municipio === ""
                                  ? null
                                  : {
                                      label: this.state.municipio,
                                      value: this.state.municipio
                                    }
                              }
                            />
                          </FormGroup>
                        </Col>

                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Estado</Label>
                            <Select
                              options={estados}
                              styles={customStyles}
                              isClearable={true}
                              placeholder={"-Selecciona-"}
                              theme={theme}
                              onChange={this.handleChangeEstado}
                              value={
                                this.state.estado === ""
                                  ? null
                                  : {
                                      label: this.state.estado,
                                      value: this.state.estado
                                    }
                              }
                            />
                            <input
                              tabIndex={-1}
                              style={{ opacity: 0, height: 0 }}
                              onChange={e => {}}
                              value={this.state.estado}
                              required={false}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Tel Celular</Label>
                            <Input
                              type="text"
                              pattern="[0-9]{10}"
                              placeholder="5555555555"
                              required
                              onChange={this.handleChange}
                              id="tel_1"
                            />
                          </FormGroup>
                        </Col>

                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Tel Casa</Label>
                            <Input
                              type="text"
                              pattern="[0-9]{10}"
                              placeholder="5555555555"
                              onChange={this.handleChange}
                              id="tel_2"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Email</Label>
                            <Input
                              type="email"
                              placeholder="Email"
                              onChange={this.handleChange}
                              id="email_1"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <button type="submit" className="btn btn-primary">
                            Guardar
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Suspense>
            </Container>
          </main>
        </div>
      );
    }
  }
}

export default Llamada_General;
