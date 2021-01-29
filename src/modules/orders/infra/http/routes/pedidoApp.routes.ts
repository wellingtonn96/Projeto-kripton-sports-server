
// module.exports = (application)=>{

//     application.get('/pedidosApp',(req, res)=>{
//       if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//         application.app.controllers.pedidoApp.pedidos_app(application, req, res);
//       }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//     application.post('/pedidosApp/:id',(req, res)=>{
//       if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//         application.app.controllers.pedidoApp.statusCompraApp(application, req, res);
//       }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//     application.get('/pedidosApp/:id',(req, res)=>{
//       if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//         application.app.controllers.pedidoApp.detalhesPedidoApp(application, req, res);
//       }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

// }
