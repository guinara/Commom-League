import TeamService from "../../service/teamService";
import { Button, Checkbox, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, Select, TextField, Typegraphy} from "@mui/material";
import React, { useState, useEffect} from "react";
import { prototype } from "prop-types";
import { Field, Formik, useFormik } from "formik";
import * as yup from 'yup';
import { RadioGroup } from 'formik-material-ui';
import CreateAutoComplete from "../../componentes/optionTest";
import {toast} from 'react-toastify'


export default function TeamForm({classe, handleClose, row, option = 'add'}){

    const serviceTeam = new TeamService();
    
    const [setValue] = useForm();
    const [data, setData] = useState("");


    //teste
    const [options, setOptions] = useState([]);



    return(
        <Formik 
            validateOnChange
            validateOnMount
            initialValues={option === 'add' ?{}:{ ...row}}
            onSubmit={async (values, { setSubmitting }) => {

                if(values.id>0)
                {
                    serviceTeam.update(values).then( response =>{
                        toast.sucess('o registro foi atualizado')
                    })
                }
                else{
                    serviceTeam.save(values).then( response => {
                        toast.sucess('O registro foi adicionado')
                    }).catch(error => {
                        toast.error('Erro ao adicionar o registro')
                    })
                }
                handleClose()
            }}
                validationSchema={yupToFormErrors.Object().shape({
                    
                })}

                >
                    {(props) => {
                        const  {
                            touched,
                            error,
                            isValid,
                            handleChange,
                            values,
                            setFieldValue,
                            handleBlur,
                            setTouched,
                            setFieldError,
                            handleSubmit,
                        } = props;
                    

                    return(
                        <form onSubmit={handleSubmit} noValidate>
                            
                            <Grid item lg={6}>
                                <CreateAutoComplete
                                helperText={(error.player && touched.player) && error.player}
                                error={(error.player && touched.error)}
                                name="player"
                                label="player"
                                defaultValue={option === 'edit' ? row.gp : ''}
                                />
                                </Grid>
                            
                            </form>
                        
                    );
                }}
                </Formik>
            
    )
}