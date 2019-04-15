module.exports = (application)=>{
    application.get('/consulta/agendar',(req, res)=>{
        application.app.controllers.consulta.cadastrar(application, req, res);		
    });

    application.post('/consulta/agendar',(req, res)=>{
        application.app.controllers.consulta.dadosConsulta(application, req, res);
    });

    application.get('/consulta/listar', (req, res)=>{
        application.app.controllers.consulta.listarConsultas(application, req, res);
    })

    application.get('/consulta/prontuario',(req, res)=>{
        application.app.controllers.consulta.cadastrarProntuario(application, req, res);		
    });
    application.post('/consulta/prontuario', (req, res)=>{
        application.app.controllers.consulta.dadosProntuario(application, req, res);
    })
}
