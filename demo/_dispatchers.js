/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    "./dispatchers/StaticResources",
    "./dispatchers/Page1",
    "./dispatchers/Page2",
    "./dispatchers/Page3"
], function () {
    var result = Array.prototype.slice.call(arguments).map(function (Clazz) { return new Clazz();});
    return result;
});
