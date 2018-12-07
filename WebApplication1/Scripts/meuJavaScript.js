$(document).ready(function () {
    $('#btnSearchAccount').click(function () {
        searchAccounts();
    })

    $('#btnAddAccount').click(function () {
        let desc = $("#formDescription").val();
        let date = $("#formDate").val();
        let val = $("#formValue").val();
        addAccounts(desc, date, val);
    })

    $('#btnUpdateAccount').click(function () {
        let id = $("#formId").val();
        let desc = $("#formDescription").val();
        let date = $("#formDate").val();
        let val = $("#formValue").val();
        updateAccounts(id, desc, date, val);
    })

    $('#btnDeleteAccount').click(function () {
        let id = $("#formId").val();
        let desc = $("#formDescription").val();
        let date = $("#formDate").val();
        let val = $("#formValue").val();
        deleteAccounts(id, desc, date, val);
    })

    $('#tbData').delegate('tr.info', "click", function () {
        let info = $(event.target).parent();
        let id = info.children('.Id').text();
        let desc = info.children('.Description').text();
        let date = info.children('.Date').text();
        let value = info.children('.Value').text();

        if (date == null || date == "") {
            /*let today = new Date(),
                dd = today.getDate(),
                mm = today.getMonth() + 1, //January is 0!
                yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            today = mm + '/' + dd + '/' + yyyy;
            console.log(today);*/
        }
        else {
            console.log(date);
            let newdate = new Date(date);
            date = newdate.toISOString().slice(0, 10);
            console.log(newdate.toISOString().slice(0, 10));
        }

        $("#formId").val(id);
        $("#formDescription").val(desc);
        $("#formDate").val(date);
        $("#formValue").val(value);
    })
    
    function searchAccounts() {
        let url = "/Home/SearchAccount";
        $.ajax({
            url: url, success: function (result) {
                let json = JSON.parse(result);
                console.table(json);

                // excluir os trs da table
                $('#tbData').children().remove();

                //o codigo abaixo cria trs com ths ou tds, se adequando caso o objeto Json cresca tanto em linhas quanto em colunas

                let keys = Object.getOwnPropertyNames(json[0]); //nome das propriedades do Json
                let tds = [];
                let ths = [];
                let trs = [];

                //criando ths
                let tr = document.createElement("tr");
                for (let k = 0; k < keys.length; k++) {
                    //criando ths para cada coluna com o nome
                    ths[k] = document.createElement("th");
                    $(ths[k]).text(keys[k]);
                    tr.append(ths[k]);
                }
                // colocando tr na table
                $('#tbData').append(tr);

                //criando trs para cada index do json
                for (let i = 0; i < json.length; i++) {
                    trs[i] = document.createElement("tr");
                    $(trs[i]).addClass('info');
                    //criando tds para cada colunas
                    for (let k = 0; k < keys.length; k++) {
                        //criando tds e colocando valores nelas
                        tds[k] = document.createElement("td");
                        $(tds[k]).text(json[i][keys[k].toString()]);
                        $(tds[k]).addClass(keys[k]);
                        trs[i].append(tds[k]);
                    }
                    // colocando tr na table
                    $('#tbData').append(trs[i]);
                }
            }
        })
    }

    function addAccounts(desc, date, val) {
        let url = "/Home/AddAccount";
        let json = new Object();
        json.Description = desc;
        json.Date = date;
        json.Value = val
        
        json = JSON.stringify({ Description: json.Description, Date: json.Date, Value: json.Value }, null, "\t");
        console.log(json);

        $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: json,
            success: function (result) {
                console.log("success");
                searchAccounts();
            },
            failure: function (result) {
                console.log("fail");
            },
            error: function (result) {
                console.log("error");
            }
        })
    }

    function updateAccounts(id, desc, date, val) {
        let url = "/Home/UpdateAccount";
        let json = new Object();
        json.Id = id;
        json.Description = desc;
        json.Date = date;
        json.Value = val

        json = JSON.stringify({ Id: json.Id, Description: json.Description, Date: json.Date, Value: json.Value }, null, "\t");
        console.log(json);

        $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: json,
            success: function (result) {
                console.log("success");
                searchAccounts();
            },
            failure: function (result) {
                console.log("fail");
            },
            error: function (result) {
                console.log("error");
            }
        })
    }

    function deleteAccounts(id, desc, date, val) {
        let url = "/Home/DeleteAccount";
        let json = new Object();
        json.Id = id;
        json.Description = desc;
        json.Date = date;
        json.Value = val

        json = JSON.stringify({ Id: json.Id, Description: json.Description, Date: json.Date, Value: json.Value }, null, "\t");
        console.log(json);

        $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: json,
            success: function (result) {
                console.log("success");
                searchAccounts();
            },
            failure: function (result) {
                console.log("fail");
            },
            error: function (result) {
                console.log("error");
            }
        })
    }
})