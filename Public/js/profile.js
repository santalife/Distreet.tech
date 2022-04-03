
function commentFocus() {
    document.getElementById("myText").focus();
}

function Like(d){
    var postId = $(d).attr("postId");
    var fullname = $(d).attr("fullname");
    const url = "/user/profile/"+ fullname +"/like/" + postId ;
    $.ajax({
        url: url,
        type: 'POST',
        contentType: false,
        processData: false,
        'success': (data) => {
            console.log(data);
            $(d).removeClass('btn-outline-danger');
            $(d).addClass('btn-danger');
            $(d).attr('onclick', 'Dislike(this);')
            $(d).html('<i class="fas fa-thumbs-up"></i> ' + data);
        }
    })
};

function Dislike(d){
    var postId = $(d).attr("postId");
    var fullname = $(d).attr("fullname");

    const url = "/user/profile/"+ fullname +"/dislike/" + postId ;
    $.ajax({
        url: url,
        type: 'POST',
        contentType: false,
        processData: false,
        'success': (data) => {
            $(d).removeClass('btn-danger');
            $(d).addClass('btn-outline-danger');
            $(d).attr('onclick', 'Like(this);')
            $(d).html('<i class="fas fa-thumbs-up"></i> Like');
        }
    })
};

function Comment(t, e){
    e.preventDefault();
    var postId = $(t).attr("postId");
    const url = window.location.pathname + '/comment/' + postId ;
    var comment = $(t).find("#comment-input-"+postId).val();
    var data = { comment }
    
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        'success': (data) => {
            setInterval('location.reload()', 100);            
        }
    })
}