//SPDX-License-Identifier: Apache-2.0

var watchmovement = require('./controller.js');

module.exports = function(app){

  app.get('/get_watchmovement/:id', function(req, res){
    watchmovement.get_watchmovement(req, res);
  });
  app.get('/add_watchmovement/:watchmovement', function(req, res){
    watchmovement.add_watchmovement(req, res);
  });
  app.get('/get_all_watchmovement', function(req, res){
    watchmovement.get_all_watchmovement(req, res);
  });
  app.get('/change_holder/:holder', function(req, res){
    watchmovement.change_holder(req, res);
  });
}