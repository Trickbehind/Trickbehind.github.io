
  $(document).ready(function() {
    $('.ui.dropdown').dropdown();
  
    // make the corresponding bubble button change color
    function activate() {
      $('#bubble .button').eq($('#slide.row .column').first().attr('data-tab') - 1).addClass('green').siblings().removeClass('green');
    };
  
    // The slide or carousel effect here is actually a moving amination of a three viewport wide row
    // left button: first make slide row animate to left
    // then move the active column to the outer right
    function leftMove() {
      var columns = $('#slide .column');
      var active = $('#slide .active.column');
      var width = active.outerWidth();
      $('#slide.row').animate({
        left: -1 *width,
        right: width
        }, 600, "swing", function() {
          active.removeClass('active');
          active.next().addClass('active');
          $(this).removeAttr('style');
          active.detach().appendTo($('#slide.row'));
          activate();
      });
    };
    $('#left').click(leftMove);
  
    // right button: first move the last column(right) to the first(left)
    // at the same time, set the left and right position of the whole row, make visible column in the middle
    // then make the row animate to right, and remove "left" and "right" style
    function rightMove() {
      var columns = $('#slide .column');
      var active = $('#slide .active.column');
      var width = active.outerWidth();
      columns.last().detach().prependTo($('#slide.row'));
      $('#slide.row').css({"left": -width, "right": -width});
      $('#slide.row').animate({
        left: 0,
        right: -2 * width
        }, 600, "swing", function() {
          active.removeClass('active');
          columns.last().addClass('active');
          $(this).removeAttr('style');
          activate();
      });
    };
    $('#right').click(rightMove);
  
    // when click the small circular button, these happen:
    // 1. make the whole row animate left and the corresponding column visible(left=0)
    // 2. move all the columns on the left(prevAll) to right
    // 3. remove the "left" position style of the row, make the target column at the very left
    // 4. make the button "green" or any other color
    $('#bubble .button').click(function() {
      var index = $(this).index() + 1;
      var target = $('[data-tab=' + index + ']');
      var targetLeft = target.position().left;
      $('#slide.row').animate({
        left: -1 * targetLeft
        }, 600, "swing", function() {
          target.prevAll().detach().appendTo($(this));
          $(this).removeAttr('style');
          activate();
      });
    });
  
    // by default, slide every 10 seconds
    setInterval(leftMove, 10000);
  });


function list (){
  $('.ui.basic.modal')
  .modal('show')
;
}