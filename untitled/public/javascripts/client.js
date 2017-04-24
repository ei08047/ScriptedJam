$(document).ready(function() {
    var ds;
    var dsReact;
    $("form[name=login]").submit(function(e){
        var username = $("input[name=username]").val();
        var password = $("input[name=password]").val();
        ds = deepstream( 'localhost:6020' ).login( { username: username, password: password }, function(success, data) {
            if (success) {
               console.log("SUCCESS!");
               console.log(data);
                $("form[name=login]").hide();
                $("form[name=addroom]").show();
               var roomList = ds.record.getList("rooms");
               roomList.subscribe(function (val) {
                   console.log(val);
                   var p = $("p[name=rooms]");
                   p.text("");
                   for(var i=0;i<val.length;i++)
                       p.text(p.text()+"\n"+val[i]);
               });
            } else {
                // extra data can be optionaly sent from deepstream for
                // both successful and unsuccesful logins
                console.log("ERROR!");
            }
        });
        dsReact.setDeepstreamClient(ds);
        e.preventDefault(e);
    });
    $("form[name=addroom]").submit(function(e) {
        var roomList = ds.record.getList("rooms");
        var roomName = $("input[name=name]").val();
        var color = $("input[name=color]").val();
        var record = ds.record.getRecord(roomName);
        record.set('color',color);
        roomList.addEntry(roomName);
        e.preventDefault(e);
    });
});