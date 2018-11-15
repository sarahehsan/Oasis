var preresult = JSON.parse(localStorage.getItem('detailLocation'));
var filters = JSON.parse(localStorage.getItem('filters'));
var extras = JSON.parse(localStorage.getItem('extras'));

var venue = parseInt(filters[0]['hours']) *
    parseInt(preresult['price'].replace(/\,/g,''));

var total = venue;
var title = "";
var e1 = "";
var e2 = "";
var e3 = "";
var e4 = "";

if(extras != null){
  console.log('check');
  title = "Additional Services";

  e1 = extras[0]['name'] + ": $" + extras[0]['price'];
  total += parseInt(extras[0]['price'].replace(/\,/g,''));
  if(extras.length > 1 ){
    e2 = extras[1]['name'] + ": $" + extras[1]['price'];
    total += parseInt(extras[1]['price'].replace(/\,/g,''));
    if(extras.length > 2 ){
      e3 = extras[2]['name'] + ": $" + extras[2]['price'];
      total += parseInt(extras[2]['price'].replace(/\,/g,''));
      if(extras.length > 3 ){
        e4 = extras[3]['name'] + ": $" + extras[3]['price'];
        total += parseInt(extras[3]['price'].replace(/\,/g,''));
      }
    }
  }
}

var result = {
  'name': preresult['name'],
  'price': preresult['price'],
  'location': preresult['location'],
  'hours': filters[0]['hours'],
  'date': filters[0]['date'],
  'image': preresult['image'],
  'venue':venue,
  'service-title':title,
  'service1':e1,
  'service2':e2,
  'service3':e3,
  'service4':e4,
  'total': total

};

function purchase(){
  var email = $('#email').val();
  var phone = $('#phone').val();
  var card =$('#card').val();
  var exp = $('#exp').val();
  var ccv = $('#ccv').val();

  var paymentInfo = [
    {'email':email,'phone':phone, 'card':card, 'exp':exp, 'ccv':ccv}
  ];

  localStorage.setItem('payment', JSON.stringify(paymentInfo));
  localStorage.setItem('extras',null);

  window.location.href='purchased.html';
}

$(document).ready(function() {
  console.log('hello world');

  // compile the template
  console.log("working")
  var source   = $("#template").html();
  var template = Handlebars.compile(source);
  var parentDiv = $("#details");

  var curData = result;
  var curHtml = template(curData);
  parentDiv.prepend(curHtml);
});