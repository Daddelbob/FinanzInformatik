﻿//# sourceURL=readJSON.js

function JsonBasics() {
    debugger;

    var voucher = {
        "ID": 1,
        "Text": "Amazon",
        "Date": "0001-01-01T00:00:00",
        "Amount": 10.22,
        "Paid": false,
        "Expense": false,
        "Details": null
    };

    voucher.Details = new Array();

    voucher.Details.push(
        {
            "ID": 1000,
            "VoucherID": 1,
            "AccountID": 500,
            "Text": "USB Stick",
            "Amount": 10.22,
            "Comment": "USB 3 Compatible"
        }
    );

    console.log("Voucher " + voucher.ID + " .....");
}

function getCustomers() {
    var url = "http://northwind.servicestack.net/customers";
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger;
            buildCustomersTable(data.Customers);
        },
        error: function (msg) {
            console.log("GetVouchers query error", msg);
        }
    });
}

function buildCustomersTable(Customers) {
    var strTbl = "<table><tbody>";
    var strTh = "<tr>";
    var strTr ="";
    for (var i = 0; i < Customers.length; ++i) {
        strTr += "<tr>";
        for (var prop in Customers[i]) {
            console.log(prop + "=" + Customers[i][prop]);
            if (i === 0) {
                strTh += "<th>" + prop + "</th>";
            }
            strTr += "<td>" + Customers[i][prop] + "</td>";
        }
        strTr += "</tr>";        
    }
    strTbl += strTh + "<tr>" + strTr + "</table>";
    document.getElementById("tblVouchers").innerHTML = strTbl;
}

function doAsyncCall() {

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('News')/Items?$select=Title",
        type: "GET",
        headers: {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json; odata=verbose"
        },
        success: function (data) {
            if (data.d.results) {
                console.log('data received: ' + JSON.stringify(data));
            }
        },
        error: function (msg) { console.log(msg) }
    });

    for (var i = 0; i < 100; i++) {
        console.log("Waiting " + i);
    }
}

function useGetJson() {

    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('News')/Items?$select=Title";
    $.getJSON(url, function (data) {
        data.d.results.forEach(function (item) {
            console.log(item.Title);
        });
    });

    for (var i = 0; i < 100; i++) {
        console.log("Waiting " + i);
    }
}

function usingThen() {

    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('News')/Items?$select=Title";

    $.getJSON(url, function (data) {
        data.d.results.forEach(function (item) {
            console.log(item.Title);
        });
    }).then(function (result) {
        for (var i = 0; i < 100; i++) {
            console.log("Waiting " + i);
        }
    });
}

function usingThenSuccessErrror() {

    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('News')/Items?$select=Title";

    $.getJSON(url, function (data) {
        data.d.results.forEach(function (item) {
            console.log(item.Title);
        });
    }).then(function (result) {
        console.log("It worked");
    }, function (result) {
        console.log("Error " + result);

    });
}

function catchError() {

    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('News')/Items?$select=Title";

    $.getJSON(url).then(function (story) {

    }, function () { }).fail(function (err) {

    }).then(function () {

    });
}