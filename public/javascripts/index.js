$(function(){
  $('.login').click(function(){
    var phone=$("#phone").val();
    var password=$("#password").val();
    $.ajax({
      type: "post",
      url: "/login",
      data: {
        phone: phone,
        password: password
      }
    });
  })
})
