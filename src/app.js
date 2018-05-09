import React from 'react';
import PropTypes from 'prop-types';
import {Form, Navbar, Grid, Row, Col, Button} from 'react-bootstrap';
import {addAsign, removeAsign, loadAsign} from './actionCreators'; 
import Option from './components/option';
import TablaAsign from './components/tablaAsign';
import { connect } from 'react-redux';

const style = {
    marginTop:"60px"
};
const t = {
    bsStyle:"danger",
    glyph:"trash",
}

const App = props =>{
    return(
        <div>
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Petróleo</a>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <a href="#">Sistemas</a>
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
            {props.resultados.length==0?
            <Grid style={style} fluid={false}>
                <Row>
                    <Col sm = {6}>
                       <Option carrera={props.carrera} addAsign = {props.addAsign} />
                    </Col>
                    <Col sm = {6}>
                        <TablaAsign asignaturas={props.cart} removeAsign = {props.removeAsign} />
                    </Col>
                </Row>
				{props.cart.length>2?<Button className="btn btn-success btn-block"  onClick = {()=>props.goHorario(props.cart.map(obj=> obj.codigo))}>Enviar</Button>:null}
            </Grid>:
            <a>ok</a>
            }
        </div>
    )
};

const mapStateToProps = state => {
    return {
        carrera: state.horario.carrera ,
        cart: state.horario.cart,
        resultados: state.horario.resultados
    }
};

const mapDispatchToProps = dispatch => {
    return {
        goHorario(data){
            dispatch(loadAsign({url:"http://localhost:8080/horarios/"+JSON.stringify(data),type:"Materias_a_inscribir"}));
        },
        removeAsign(product){
           dispatch(removeAsign(product)); 
        },
        addAsign(product){
            dispatch(addAsign(product)); 
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);