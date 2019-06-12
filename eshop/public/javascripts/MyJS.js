function OnSelectSort()
{
    console.log("begin sort");
    try {
        var boollenOfSelect = document.getElementById("sortSelect").value;
    }catch (e) {
        console.log(e);
    }
    if(boollenOfSelect == "Giá tăng"){
        document.getElementById("demo").innerHTML = "You selected: " + boollenOfSelect;
        console.log("Gia Tang");
        controller.SortUp;
    }
    else{
        document.getElementById("demo").innerHTML = "You selected: " + boollenOfSelect;
        console.log("Gia giam");
    }

}