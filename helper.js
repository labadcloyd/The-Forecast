function dateGetter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let days = ['Sun,','Mon,','Teu,','Wed,','Thu,','Fri,','Sat,'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let dayNum = a.getDay();
    let time = days[dayNum] +' '+ month + ' ' + date;
    return time;
}
function hourGetter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let minute = a.getMinutes();
    let time = month + '/' + date + '. ' + hour + ':' + minute + '0' ;
    return time;
}
function roundStr(str){
    let roundedstr = str.toString();
    return Math.round(roundedstr);
}

module.exports = {
    dateGetter:dateGetter,
    roundStr:roundStr,
    hourGetter: hourGetter
}