/**
 * Created by Karen on 2015/4/2.
 */
$(document).ready(function () {
    //�����o�����i�P������������s
    $(".btnTo1").hide();
    $(".btnTo2").click(function () {
        $(".btnTo2").css("display","none");
        $(".btnTo1").css("display","block");
        //����title�Ϥ�
        $(".superwoman").css('background-image','url("images/winnerSuper2.png")');
    });
    //�����o�����i�P������������s
    $(".btnTo1").click(function () {
        $(".btnTo1").css("display","none");
        $(".btnTo2").css("display","block");
        //����title�Ϥ�
        $(".superwoman").css('background-image','url("images/winnerSuper1.png")');
    });

    //�����o�����i�P���������Ӱ϶�
    $(".btnTo1,.btnTo2").click(function(){
        //����U�@��click��,�e�@�ө|���]��
        $(".tabBox ul li").first().stop(true,true);
        // �]���Ĥ@��li��,��Ĥ@li������[��̫�@��li�������᭱,�ç�margin-left�k�s
        $(".tabBox ul li").first().animate({'margin-left': $(".tabBox ul li").first().width()*-1 },function(){
            $(".tabBox ul li").last().css('margin-left','0').after( $(".tabBox ul li").first().css('margin-left','0') );
        });
    });


    //m��menu�}��
    $(".menuList").hide();
    $(".menuBtn").click(function () {
        $(".menuList").slideToggle();
    });

    //goTop
    $(".mfooter").click(function(){
        $("html,body").animate({scrollTop:0},800);//�I��go to top���s�ɡA�H800�@���t�צ^�쳻��
    });

    //menu�ư�
    $(".menuList>ul>li").eq(0).click(function(){
        $("html,body").animate({scrollTop: $(".mBlock2").offset().top},800);//�I��go to top���s�ɡA�H800�@���t�צ^�쳻��
    });
    $(".menuList>ul>li").eq(1).click(function(){
        $("html,body").animate({scrollTop: $(".mBlock4").offset().top},800);//�I��go to top���s�ɡA�H800�@���t�צ^�쳻��
    });
});