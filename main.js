
$(document).ready(function() {
let condaition = 'create'; 
let textUdate = null;   
let myData = [];
// let state = [];

function getDataFromLocal() {
    let getData = localStorage.getItem('myTodos');
    getData ? myData = JSON.parse(getData) : myData;
}
getDataFromLocal();

$('#add').on('click', () => {
    let text = $("[type='text']").val();
    if (condaition === "create") {
        if (text) {
            let noRepet = myData.some(e => text === e.text );
            if (!noRepet){
                addToLocalStorge(text);
                text = $("[type='text']").val('');
            } else {
                alert("this task exists")
            }
        } else {
            alert('this field is required')
        }
    } else {
        myData.map((e, x) => textUdate === x && console.log(e.text = text))
        saveLocalStorge(myData);
        text = $("[type='text']").val('');
    }
    location.reload();
});
function saveLocalStorge(x) {
    localStorage.setItem("myTodos", JSON.stringify(x))
}
function showDataTable(d) {
    let theData = d.map((e) => `<tr class=' overflow-hidden bg-slate-400'>
                                        <td class='px-2 text w-full'>${e.text}</td>
                                        <td class='px-3 w-3 '><span class="bg-[#ff0] w-full p-2 rounded-full"><input class='check' type="checkbox" value='${e.done}' /></span></td>
                                        <td class="px-6  text-white w-3"><span class="w-full p-2 rounded-full bg-green-500 overflow-hidden"><i class="fa-solid fa-pen update cursor-pointer rounded-full"></i></span></td>
                                        <td class="px-3 text-white w-3"><span class="w-full p-2 rounded-full bg-red-500 overflow-hidden"><i class="fa-solid fa-trash-can del cursor-pointer"></i></span></td>
                                        </tr>`);
$('tbody').append(theData);
}
showDataTable(myData);
function addToLocalStorge(x) {
    let newText= {
        text: x,
        done: false,
    };
    myData.unshift(newText);
    saveLocalStorge(myData) ;          
}
$('.del').on('click', function() {
    $(this).parent().parent().parent().fadeOut(500);
    let index = $(this).parent().parent().parent().index();
    myData.map((e,x) => x === index && myData.splice(x, 1))
    saveLocalStorge(myData);
    setTimeout(function() {
        location.reload();
    }, 500);
})
$('.update').on('click', function() {
    condaition = 'update';
    $(this).parent().parent().parent().animate({opacity: 0.3},500);
    let index = $(this).parent().parent().parent().children('.text').text();
    textUdate = $(this).parent().parent().parent().index();
    $("[type='text'").val(index).css({opacity: 0.1 }).animate({opacity: 1},1500);
    $(this).parent().parent().parent().animate({"background-color": "red"},1500);
})
$('.check').change( function() {
    let index = $(this).parent().parent().parent().index();
    if ($(this).is(':checked')) {
         myData.map((e,x) => x === index && (e.done = true));
         $(this).parent().parent().parent().children('.text').css({"text-decoration-color": "#ef4444","text-decoration-line": "line-through","color": "red"})
         $(this).parent().css({"background-color": "#0ff"}); 
    } else {
        myData.map((e,x) => x === index && (e.done = false) && console.log(index,x,e));
        $(this).parent().parent().parent().children('.text').css({"text-decoration-line": "none","color": "black"});
        $(this).parent().css({"background-color": "#ff0"});      

    }
    saveLocalStorge(myData);
});
function checked() {
    let y = null;
    myData.map((a, n) => {
        a.done === true ? y = n : y = null;
        $('tbody tr').each((e, x) => {
            if (y === e) {
                 x.childNodes[3].firstChild.firstChild.checked = true;
                 x.childNodes[3].firstChild.style.background =  "#0ff";
                 x.childNodes[1].style.textDecorationColor = "#ef4444";
                 x.childNodes[1].style.textDecorationLine = "line-through";
                 x.childNodes[1].style.color = "red";
            }
        });
    });
}
checked();
$('#completed').change(function() {
    let checkedRows = $('tbody tr').filter(function() {
        return !$(this).find('.check').is(':checked');
    });
    let notcheckedRows = $('tbody tr').filter(function() {
        return $(this).find('.check').is(':checked');
    });
    notcheckedRows.fadeIn(500);
    checkedRows.fadeOut(500);
});

$('#note').change(function() {
    let checkedRows = $('tbody tr').filter(function() {
        return $(this).find('.check').is(':checked');
    });
    let notcheckedRows = $('tbody tr').filter(function() {
        return !$(this).find('.check').is(':checked');
    });
    notcheckedRows.fadeIn(500);
    checkedRows.fadeOut(500);
});

});