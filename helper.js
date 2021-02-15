function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let days = ['Sun','Mon','Teu','Wed','Thu','Fri','Sat'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let dayNum = a.getDay();
    let time = days[dayNum] +' '+ month + ' ' + date;
    return time;
}
function sliceStr(str){
    let slicedstr = str.toString();
    return slicedstr.slice(0,-3);
}

module.exports = {
    timeConverter:timeConverter,
    sliceStr:sliceStr
}